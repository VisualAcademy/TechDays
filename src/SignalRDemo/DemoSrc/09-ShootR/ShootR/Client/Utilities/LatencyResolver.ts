/// <reference path="ClientServerTime.ts" />
/// <reference path="UtilityFunctions.ts" />

class LatencyResolver {
    public SampleSize: number = 10;// We want X samples before calculating correct delta time
    public Latency: string = "...";

    private _pingCount: number = 0;
    private _deltas: number[] = [];
    private _CST: ClientServerTime = new ClientServerTime();
    private _requestedPingAt: any = false;

    constructor (private _connection: any) { }

    private calculateDeltaTime(sentAt: number, serverTime: number): number {
        var currentTime: number = new Date().getTime(),
            latency: number = this.CalculateLatencySince(sentAt);

        return (currentTime - serverTime + latency);
    }

    private pushPingResults(sentAt: number, result: number): void {
        this._deltas.push(this.calculateDeltaTime(sentAt, result));
    }

    public RequestedPingBack(): void {
        if (!this._requestedPingAt) {
            this._requestedPingAt = new Date().getTime();
        }
    }

    public ServerPingBack(): void {
        if (this._requestedPingAt) {
            this.Latency = this.CalculateLatencySince(this._requestedPingAt) + " ms";
            this._requestedPingAt = false;
        }
    }

    public ResolveFromAcknowledgement(sentAt: number, serverAcknowledgedAt: number): void {
        this.pushPingResults(sentAt, serverAcknowledgedAt);

        if (this._deltas.length === this.SampleSize) {
            this._CST.Delta = this.GenerateDeltaTime();
            this._deltas = [];
        }
    }

    public CalculateLatencySince(sentAt: number): number {
        return (new Date().getTime() - sentAt) / 2
    }

    public Resolve(callback: Function) {
        var that: LatencyResolver = this;

        this._deltas = [];
        // Do an initial ping (this clears the network/readies the tunnel).
        this._connection.server.ping().done(GetDelta);

        function GetDelta() {
            // Calculate delta time
            var sentAt: number = new Date().getTime();
            this.connection.server.ping().done(function (result) {
                that.pushPingResults(sentAt, this._CST.GetServerTime(new Date(result).getTime()));

                if (++that._pingCount < that.SampleSize) {
                    GetDelta();
                }
                else if (that._pingCount === 1) {
                    that._CST.Delta = that._deltas[0];
                }
                else { // Latency Resolving complete
                    that._CST.Delta = that.GenerateDeltaTime();
                    that._deltas = [];
                    callback();
                }
            });
        }
    }

    public GenerateDeltaTime(): number {
        this._deltas.sort();

        var standardDeviation: number = StandardDeviation(this._deltas),
        median: number = this._deltas[Math.floor(this._deltas.length / 2)];

        // Remove items 1 standard deviation away from the median
        for (var i = 0; i < this._deltas.length; i++) {
            // Check if the value is at least one standard deviation away from the median
            if (Math.abs(this._deltas[i] - median) >= standardDeviation) {
                this._deltas.splice(i--, 1);
            }
        }

        return Math.round(Average(this._deltas));
    }
}
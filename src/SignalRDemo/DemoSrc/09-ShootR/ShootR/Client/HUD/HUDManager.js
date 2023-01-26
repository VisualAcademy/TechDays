var HUDManager = (function () {
    function HUDManager(MyShip, _connection) {
        this.MyShip = MyShip;
        this._connection = _connection;
        this._gameHUD = $("#gameHUD");
        this._doublePopupHolder = $("#doublePopupHolder");
        this._locationStats = $("#LocationStatisticsHolder");
        this._shipStats = $("#StatisticHolder");
        this.GameDetailManager;
        this.HealthMonitor = new HealthMonitor(MyShip);
        this.ExperienceMonitor = new ExperienceMonitor(this._gameHUD, this.MyShip);
        this.MyRankings = new MyRankings();
        this.Leaderboard = new Leaderboard(this._gameHUD, this.MyShip, this._connection);
        this.DeathScreen = new DeathScreen(this.Leaderboard, this.MyShip);
        this.ShipStatMonitor = new ShipStatMonitor(this.MyShip);
        this.EnvironmentMonitor = new EnvironmentMonitor(this.MyShip);
        this.NotificationManager = new NotificationManager();
        this.AreaRenderer = new AreaRenderer(this.MyShip, Map.WIDTH);
        this._gameHUDHeight = this._gameHUD.height();
    }
    HUDManager.prototype.CenterDoublePopup = function (newViewport) {
        this._doublePopupHolder.css("top", ((newViewport.Height - this._gameHUDHeight) / 2) - this._doublePopupHolder.height() / 2);
    };
    HUDManager.prototype.OnMapResize = function (newMapSize) {
        this.AreaRenderer.OnMapResize(newMapSize.Width);
    };
    HUDManager.prototype.OnScreenResize = function (newViewport) {
        this._gameHUD.css("width", newViewport.Width);
        this._gameHUD.css("height", this._gameHUDHeight);
        this._gameHUD.css("top", newViewport.Height - this._gameHUDHeight);
        this.HealthMonitor.OnScreenResize();
        this.CenterDoublePopup(newViewport);
        if(newViewport.Width <= 1370) {
            this._locationStats.css("display", "none");
        } else {
            this._locationStats.css("display", "block");
        }
        if(newViewport.Width <= 1177) {
            this._shipStats.css("display", "none");
        } else {
            this._shipStats.css("display", "block");
        }
    };
    HUDManager.prototype.Initialize = function () {
        this.GameDetailManager = new GameDetailManager();
    };
    HUDManager.prototype.Update = function (payload) {
        this.HealthMonitor.Update();
        this.ExperienceMonitor.Update();
        this.MyRankings.Update(payload.Kills, payload.Deaths);
        this.ShipStatMonitor.Update();
        this.EnvironmentMonitor.Update(payload);
        this.AreaRenderer.Update();
    };
    return HUDManager;
})();
//@ sourceMappingURL=HUDManager.js.map

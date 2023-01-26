/// <reference path="../Utilities/Vector2.ts" />
/// <reference path="../Utilities/Size.ts" />
/// <reference path="../Utilities/ValueRef.ts" />
/// <reference path="MovementControllers/MovementController.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />

class Collidable {
    private _animationCanvasOffset: Vector2;

    public AnimationDrawList: any[];
    public Visible: bool;
    public LastUpdated: Date;
    public Vehicle: HTMLImageElement;
    public FollowID: number;
    public AnimationCanvas: HTMLCanvasElement;
    public LifeController: any;
    public AnimationCanvasContext: CanvasRenderingContext2D;
    public Controllable: ValueRef;
    public MovementController: MovementController;
    public Collided: bool;
    public CollidedAt: Vector2;
    public ID: number;
    public Disposed: bool;

    public WIDTH: number;
    public HEIGHT: number;

    constructor () {
        this._animationCanvasOffset = Vector2.Zero();

        this.LifeController = {};
        this.AnimationDrawList = [];
        this.Visible = true;
        this.LastUpdated = new Date();
        this.Controllable = new ValueRef(true);
        this.Collided = false;
        this.Disposed = false;
    }

    public InitializeAnimationCanvas(): void {
        this.AnimationCanvas = <HTMLCanvasElement>document.createElement("canvas");
        this.AnimationCanvasContext = this.AnimationCanvas.getContext("2d");
    }

    public UpdateProperties(properties: any): void {
        for (var key in properties) {
            this[key] = properties[key];
        }
    }

    public UpdateAnimationCanvasSize(size: Size): void {
        this.AnimationCanvas.width = size.Width;
        this.AnimationCanvas.height = size.Height;
        this._animationCanvasOffset.X = (this.WIDTH - size.Width) / 2;
        this._animationCanvasOffset.Y = (this.HEIGHT - size.Height) / 2;
    }

    public Draw(): void {
        if (this.LifeController.Alive && this.Visible) {
            if (this.Vehicle) {
                CanvasContext.drawRotatedImage(this.Vehicle, this.MovementController.Rotation, this.MovementController.Position.X, this.MovementController.Position.Y);
            }

            if (this.AnimationCanvas) {
                // Draw animations onto animation canvas
                for (var i = this.AnimationDrawList.length - 1; i >= 0; i--) {
                    this.AnimationDrawList[i].Draw();
                }

                CanvasContext.drawRotatedImage(this.AnimationCanvas, this.MovementController.Rotation, this.MovementController.Position.X + this._animationCanvasOffset.X, this.MovementController.Position.Y + this._animationCanvasOffset.Y);
            }
        }
    }
}
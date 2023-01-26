/// <reference path="../Collidable/Collidable.ts" />
/// <reference path="ShipAnimationHandler.ts" />
/// <reference path="ShipMovementController.ts" />
/// <reference path="../Abilities/AbilityHandlers/ShipAbilityHandler.ts" />
/// <reference path="../Utilities/GameTime.ts" />
/// <reference path="../GameGlobals.ts" />
/// <reference path="../Managers/spritify.ts" />
/// <reference path="../Utilities/ImageAssets.ts" />
/// <reference path="ShipAnimationHandler.ts" />
/// <reference path="../HUD/HealthMonitor.ts" />
/// <reference path="../Space/CanvasRenderer.ts" />


class Ship extends Collidable {
    static WIDTH: number;
    static HEIGHT: number;
    static HALF_WIDTH: number;
    static HALF_HEIGHT: number;
    static MIN_FIRE_RATE: number;
    static START_LIFE: number;
    static DAMAGE_INCREASE_RATE: number;

    public ID: number;
    public Name: string;
    public MaxLife: number;
    public AnimationHandler: ShipAnimationHandler;
    public ShipAbilityHandler: ShipAbilityHandler;
    public MovementController: ShipMovementController;

    private _maxWidth: number;
    private _xOffset: number;
    private _currentHealth: number;
    private _lastHealth: number;
    private _currentHealthPercentage: number;
    private _miniHealthBarColor: string;

    constructor (properties?: any) {
        super();
        this.MovementController = new ShipMovementController(Vector2.Zero());

        this.UpdateProperties(properties);

        this.WIDTH = Ship.WIDTH;
        this.HEIGHT = Ship.HEIGHT;
        this._maxWidth = this.WIDTH * .8;
        this._xOffset = (this.WIDTH - this._maxWidth) * .5;

        this.AnimationHandler = new ShipAnimationHandler(this);
        this.ShipAbilityHandler = new ShipAbilityHandler(this);
    }

    public Destroy(): void {
        // Ship has died
        if (!this.LifeController.Alive) {
            // We want to explode
            GAME_GLOBALS.AnimationManager.Add(new spritify({
                image: IMAGE_ASSETS.BigExplosion,
                centerOn: { X: this.MovementController.Position.X + Ship.HALF_WIDTH, Y: this.MovementController.Position.Y + Ship.HALF_HEIGHT },
                frameCount: 30,
                fps: 25,
                spriteSheetSize: new Size(768, 640),
                frameSize: new Size(128, 128),
                Rotation: this.MovementController.Rotation
            }));
        }

        this.Visible = false;
    }

    public Update(gameTime?: GameTime): void {
        var PercentOfSecond: number = CalculatePOS(this.LastUpdated);
        this.UpdateFromSecond(PercentOfSecond);
    }

    public UpdateFromSecond(percentOfSecond: number): void {
        var now: Date = new Date();

        this.MovementController.Update(percentOfSecond, now);
        this.AnimationHandler.Update(now);
        this.AnimationHandler.DrawDamage();
        this.ShipAbilityHandler.Update(now);
        this.LastUpdated = now;
    }

    public DrawHealthBar(): void {
        if (this._lastHealth !== this.LifeController.Health) {
            this._currentHealthPercentage = this.LifeController.Health / this.MaxLife,
            this._currentHealth = this._maxWidth * this._currentHealthPercentage;
            this._lastHealth = this.LifeController.Health;

            if (this._currentHealthPercentage <= HealthMonitor.BadThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipBad;
            }
            else if (this._currentHealthPercentage <= HealthMonitor.HurtThreshold) {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipHurt;
            }
            else {
                this._miniHealthBarColor = GAME_GLOBALS.Colors.ShipGood;
            }
        }

        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._maxWidth, 5, "#7F767D");
        CanvasContext.drawRectangle(this.MovementController.Position.X + this._xOffset, this.MovementController.Position.Y + this.HEIGHT + 15, this._currentHealth, 5, this._miniHealthBarColor);
    }

    public DrawName(healthOffset: number): void {
        CanvasContext.drawText(this.Name, this.MovementController.Position.X + Ship.HALF_WIDTH, this.MovementController.Position.Y + this.HEIGHT + 30 + healthOffset);
    }
}
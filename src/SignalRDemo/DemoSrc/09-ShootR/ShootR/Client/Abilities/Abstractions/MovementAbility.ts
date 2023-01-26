/// <reference path="Ability.ts" />

class MovementAbility extends Ability {
    private _initialPower: number;

    constructor (name: string, public MovementController: any) {
        super(name);

        this._initialPower = MovementController.Power;
    }

    public IncreaseSpeedBy(amount: number): void {
        this.MovementController.Power += amount;
    }

    public MultiplySpeedBy(amount: number): void {
        this.MovementController.Power *= amount;
    }

    public DecreaseSpeedBy(amount: number): void {
        this.MovementController.Power -= amount;
    }

    public ResetSpeed(): void {
        this.MovementController.Power = this._initialPower;
    }
}
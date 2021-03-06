type ValueChangeListener<T> = (now: T, old: T) => void

export default class ObservableValue<T> {
    protected listeners: ValueChangeListener<T>[] = []

    constructor(private _val: T) {
    }

    get value(): T {
        return this._val
    }

    set value(value: T) {
        if (this.val == value) {
            return
        }
        const old = this.val
        this._val = value
        this.listeners.forEach(lis => lis(value, old))
    }

    // @deprecated
    get val(): T {
        return this._val
    }

    set val(value: T) {
        if (this.val == value) {
            return
        }
        const old = this.val
        this._val = value
        this.listeners.forEach(lis => lis(value, old))
    }

    public addListener(listener: ValueChangeListener<T>): void {
        this.listeners.push(listener)
    }

    public removeListener(listener: ValueChangeListener<T>): void {
        this.listeners = this.listeners.filter(it => listener === it)
    }
}
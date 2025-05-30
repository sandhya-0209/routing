import { Observable } from "rxjs";

export interface ICandeactivate{
    canDeactive : () => boolean | Promise<boolean> | Observable<boolean>
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from './authentication.service';
import { Robot } from '../model/robot';

@Injectable()
export class RobotService {
    url: string = "https://robot-api1.herokuapp.com/robot";
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getRobots(): Observable<Robot[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options)
            .map((response: Response) => response.json())
    }

    addRobot(robot: Robot): Observable<Robot> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers });
        return this.http.post(this.url, robot, options)
                    .map((res: Response) => res.json())
    }
    deleteRobot(id: number): Observable<void> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers });
        return this.http.delete(this.url+"/"+id, options)
        .map((response: Response) => {
            console.log(response);
        });
    }
}
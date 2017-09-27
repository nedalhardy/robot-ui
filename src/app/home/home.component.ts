import { Component, OnInit, ViewChild  } from '@angular/core';
import { Robot } from '../model/robot';
import { RobotService } from '../service/robot.service';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']    
})

export class HomeComponent implements OnInit {
    robots: Robot[] = [];
    writing: boolean = false;
    model: any = {};    
    @ViewChild('modal1') modal;

    constructor(private robotService: RobotService) { }

    delete(id: number) {
        this.deleteRobot(id);
    }
    save() {
        this.addRobot(this.model);
        this.modal.hide();
    }
    ngOnInit() {
        this.getRobots();
        const currentUser = localStorage.getItem('currentUser');
        const authorities = JSON.parse(currentUser)['user']['authorities'];
        if (authorities.filter(e => e.role == 'ROLE_WRITE').length > 0) {
            this.writing = true;
        }
    }
    getRobots(){
        this.robotService.getRobots()
        .subscribe(robots => {
            this.robots = robots;
        });
    }
    addRobot(robot: Robot) {
        this.robotService.addRobot(robot)
        .subscribe(robots => {
            this.getRobots();
        });
    }
    
    deleteRobot(id: number){
        this.robotService.deleteRobot(id)
        .subscribe(robot => {
            console.log(robot);
            this.getRobots();
        });
    }

}
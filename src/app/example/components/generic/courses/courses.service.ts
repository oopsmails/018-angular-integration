import { Injectable } from '@angular/core';
import { Course } from '@app/shared/model';


@Injectable()
export class CoursesService {
  courses: Course[] = [
    {
      courseNumber: '1',
      courseName: 'Angular'
    },
    {
      courseNumber: '2',
      courseName: 'Java'
    },
    {
      courseNumber: '3',
      courseName: 'Typescript'
    },
    {
      courseNumber: '4',
      courseName: 'Python'
    }
  ];

  constructor() { }

  getCourses() {
    return this.courses;
  }
}


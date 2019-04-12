import { Injectable } from '@angular/core';
import { Course, CourseType } from '@app/shared/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class CoursesService {
  courses: Course[] = [
    {
      courseId: '1',
      courseName: 'Angular',
      courseType: CourseType.ONLINE
    },
    {
      courseId: '2',
      courseName: 'Java',
      courseType: CourseType.FACE_TO_FACE
    },
    {
      courseId: '3',
      courseName: 'Typescript',
      courseType: CourseType.ONLINE
    },
    {
      courseId: '4',
      courseName: 'Python',
      courseType: CourseType.FACE_TO_FACE
    }
  ];

  constructor() { }

  getCourses(): Observable<Array<Course>> {
    const mockItems = new Array<Course>();

    for(let i = 0; i < 102; i++) {
      let type = CourseType.ONLINE
      if (i % 2 === 0) {
        type = CourseType.FACE_TO_FACE;
      }
      const item = {
        courseId: '' + i,
        courseName: 'courseName ' + i,
        courseType: type
      } as Course;

      // const item = new Course('' + i, 'Name abc ' + i);
      mockItems.push(item);
    }

    // const mockPostsSubject: BehaviorSubject<Array<Course>> = new BehaviorSubject(this.courses);
    const mockPostsSubject: BehaviorSubject<Array<Course>> = new BehaviorSubject(mockItems);

    // return mockPostsSubject.asObservable();
    return mockPostsSubject.asObservable().pipe(delay(1000));
  }
}


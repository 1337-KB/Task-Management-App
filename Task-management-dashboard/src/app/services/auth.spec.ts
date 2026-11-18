import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Auth);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post credentials to the backend login endpoint', () => {
    let completed = false;
    service.login('test-user', 'test-password').subscribe({
      complete: () => { completed = true; },
    });

    const request = httpTesting.expectOne('http://localhost:8080/api/tasks/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      username: 'test-user',
      password: 'test-password',
    });
    request.flush(null);

    expect(completed).toBe(true);
  });

  it('should propagate authentication errors to the caller', () => {
    let status: number | undefined;
    service.login('test-user', 'wrong-password').subscribe({
      error: error => { status = error.status; },
    });

    const request = httpTesting.expectOne('http://localhost:8080/api/tasks/auth/login');
    request.flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(status).toBe(401);
  });
});

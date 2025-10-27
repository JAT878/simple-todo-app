# Todo App

A simple todo list with Angular 19 frontend and .NET 9 Web API backend. In-memory storage.

## Run

### Backend (.NET API)
```
cd backend/TodoApi
dotnet run
```
API runs at `http://localhost:5000`

### Frontend (Angular)
```
npm install
npm start
```
App runs at `http://localhost:4200`

## Structure

**Backend:**
- `backend/TodoApi/Program.cs` 

**Frontend:**
- `src/app/todo.service.ts` - HTTP calls to backend API
- `src/app/todo.component.ts` - Component logic
- `src/app/todo.component.html` - Template
- `src/app/todo.component.css` - Styles

Both servers must be running. Todos reset when API stops.

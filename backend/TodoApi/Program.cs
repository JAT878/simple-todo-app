var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors();

var todos = new List<TodoItem>();
var nextId = 1;

app.MapGet("/api/todos", () => todos);

app.MapPost("/api/todos", (TodoRequest request) =>
{
    var todo = new TodoItem(nextId++, request.Title, false);
    todos.Add(todo);
    return todo;
});

app.MapPut("/api/todos/{id}", (int id) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo == null) return Results.NotFound();

    var updated = todo with { IsCompleted = !todo.IsCompleted };
    var index = todos.IndexOf(todo);
    todos[index] = updated;
    return Results.Ok(updated);
});

app.MapDelete("/api/todos/{id}", (int id) =>
{
    var todo = todos.FirstOrDefault(t => t.Id == id);
    if (todo == null) return Results.NotFound();

    todos.Remove(todo);
    return Results.NoContent();
});

app.Run();

record TodoItem(int Id, string Title, bool IsCompleted);
record TodoRequest(string Title);

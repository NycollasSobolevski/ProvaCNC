namespace webapi;

public class GetAllReturn<T>
{
    public required IEnumerable<T> Items { get; set; }
    public bool Next { get; set; } = false;
    public int Pages { get; set; } = 0;
    public int Count { get; set; } = 0;
}
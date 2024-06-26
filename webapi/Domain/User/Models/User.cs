using System;
using System.Collections.Generic;

namespace webapi.Domain.Model;

public partial class User : TEntity
{

    public string Name { get; set; } = null!;

    public string Identification { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public bool Admin { get; set; }

}

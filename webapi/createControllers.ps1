$domains = Get-ChildItem -Path ".\Domain" -Directory

foreach ($folder in $domains) {
    $newname = $folder.BaseName + "Controller.cs"

    $ignore = ("BaseController.cs", "ClassController.cs", "CollaboratorController.cs", "FeedBackController.cs","TestController.cs", "ExceptionController.cs")

    if ( $ignore -contains $newname ){
        continue
    }
    
    $classname = "public class " +  $folder.BaseName + "Controller" +" : BaseController<" + $folder.BaseName + "> { }"
    $newpath = "./Controllers/" + $newname
    $content = ( "using back.Domain.Model;", "", "namespace back.Controller;", $classname )
    Set-Content -Path $newpath -Value $content
}
$dirs = Get-ChildItem -Path ".\Model" -File
$ignorated = @();
$index_of_ignorated = 0
$base_namespace

if($args -contains "--basenamespace") {
    $index_namespace = [array]::IndexOf($args, "--basenamespace")
    $base_namespace = $args[$index_namespace + 1]
}


if ($args -contains "--ignore") {
    $index_of_ignorated = [array]::IndexOf($args, "--ignore")
    for ($i = $index_of_ignorated + 1; $i -lt ($args.Count); $i++) {
        if ($args[$i].Contains("-")) {
            break
        }
        $ignorated += $args[$i];
    }
}

function Create-By-Model {
   
    foreach ($file in $dirs) {
    
        if ($ignorated.Count -gt 0 -and $ignorated -contains $file) {
            Write-Host "$file ignorated"
            continue  
        }
    
        $file_path = Join-Path -Path $file.DirectoryName -ChildPath $file.Name
        $file = $file.BaseName
        
        # ======================= creating Domain dependences =======================
    
        $domain_path      = Join-Path -Path "./Domain/" -ChildPath $file;
        $model_path       = Join-Path -Path $domain_path -ChildPath "Models";
        $repository_path  = Join-Path -Path $domain_path -ChildPath "Repositories";
        $service_path     = Join-Path -Path $domain_path -ChildPath "Services";
        
        #creating Domain sub-folders
        mkdir $model_path ;
        mkdir $repository_path ;
        mkdir $service_path;
        
        $model_filename = $file + ".cs";
        $model_content = Get-Content -Path $file_path;
        #editing namespace of MODEL
        if($base_namespace -ne ""){
            for ($line = 0; $line -lt $model_content.Count; $line ++) {
                if($model_content[$line].Contains("namespace")) {
                    $model_content[$line] = "namespace " + $base_namespace + ".Domain.Model;";
                    break
                }
            }
        }
        $model_content | Out-File -FilePath "$model_path/$model_filename";
    
        $irepository_filename = "I" + $file + "Repository.cs";
        $repository_content = "//! Implements IRepository here!";
        $repository_content | Out-File -FilePath "$repository_path/$irepository_filename";
        
        $iservice_filename = "I" + $file + "Service.cs"
        $service_content = "//! Implements Iservice here! ";
        $service_content | Out-File -FilePath "$service_path/$iservice_filename";
    
    
    
        # ======================= creating Core dependences =======================
    
        $core_path      = Join-Path -Path "./Core/" -ChildPath $file;
        
        $classmap_filename = $file + "ClassMap.cs";
        $repository_filename = $file + "Repository.cs"
        $service_filename = $file + "Service.cs"
        
        $map_path         = Join-Path -Path $core_path -ChildPath "Mapping";
        $repository_path  = Join-Path -Path $core_path -ChildPath "Repository";
        $service_path     = Join-Path -Path $core_path -ChildPath "Service";
        
        mkdir $map_path ;
        mkdir $repository_path ;
        mkdir $service_path;
    
        $map_file_path = Join-Path -Path $map_path -ChildPath $classmap_filename;
        $repo_file_path = Join-Path -Path $repository_path -ChildPath $repository_filename;
        $service_file_path = Join-Path -Path $service_path -ChildPath $service_filename;
        
        $classmap_content = "//! Implements classMapping here!";
        $classmap_content | Out-File -FilePath $map_file_path;
    
        $repository_content = "//! Implements $file Repository here!";
        $repository_content | Out-File -FilePath $repo_file_path;
        
        $service_content = "//! Implements $file Service here!";
        $service_content | Out-File -FilePath $service_file_path;
    
    
    }
}

function Create-Dependences-By-Name {
    param (
        [string]$Name
    )

    $domain_path      = Join-Path -Path "./Domain/" -ChildPath $Name;
    $model_path       = Join-Path -Path $domain_path -ChildPath "Models";
    $repository_path  = Join-Path -Path $domain_path -ChildPath "Repositories";
    $service_path     = Join-Path -Path $domain_path -ChildPath "Services";
    
    #creating Domain sub-folders
    mkdir $model_path ;
    mkdir $repository_path ;
    mkdir $service_path;
    
    $model_filename = $Name + ".cs";
    $namespace = ""
    $classname = "public partial class " + $Name;
    $model_content = ( 
        $namespace, "", $classname, "{", "  ","}"
    )
    #editing namespace of MODEL
    $model_content | Out-File -FilePath "$model_path/$model_filename";

    $irepository_filename = "I" + $Name + "Repository.cs";
    $repository_content = "//! Implements IRepository here!";
    $repository_content | Out-File -FilePath "$repository_path/$irepository_filename";
    
    $iservice_filename = "I" + $Name + "Service.cs"
    $service_content = "//! Implements Iservice here! ";
    $service_content | Out-File -FilePath "$service_path/$iservice_filename";

    # ======================= creating Core dependences =======================

    $core_path      = Join-Path -Path "./Core/" -ChildPath $Name;
    
    $classmap_filename = $Name + "ClassMap.cs";
    $repository_filename = $Name + "Repository.cs"
    $service_filename = $Name + "Service.cs"
    
    $map_path         = Join-Path -Path $core_path -ChildPath "Mapping";
    $repository_path  = Join-Path -Path $core_path -ChildPath "Repository";
    $service_path     = Join-Path -Path $core_path -ChildPath "Service";
    
    mkdir $map_path ;
    mkdir $repository_path ;
    mkdir $service_path;

    $map_file_path = Join-Path -Path $map_path -ChildPath $classmap_filename;
    $repo_file_path = Join-Path -Path $repository_path -ChildPath $repository_filename;
    $service_file_path = Join-Path -Path $service_path -ChildPath $service_filename;
    
    $classmap_content = "//! Implements classMapping here!";
    $classmap_content | Out-File -FilePath $map_file_path;

    $repository_content = "//! Implements $Name Repository here!";
    $repository_content | Out-File -FilePath $repo_file_path;
    
    $service_content = "//! Implements $Name Service here!";
    $service_content | Out-File -FilePath $service_file_path;
    
}

if( $args -contains "-New" ){
    $index_new = [array]::IndexOf($args, "-New")
    Create-Dependences-By-Name $args[$index_new + 1]
}
else {
    Create-By-Model
}
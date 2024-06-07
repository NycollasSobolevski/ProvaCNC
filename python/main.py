import os

files = os.listdir()
removeItems = []
for file in files:
    if not file.endswith('.txt') or file.startswith('_'):
        removeItems.append(file)

for i in removeItems:
    files.remove(i)


answer = open("_Respostas.txt", 'r').readlines()

for filePath in files:
    file = open(filePath, 'r')

    content = file.readlines()

    newContent = []
    errors = 0
    lines  = len(answer)
    for i in range(len(content)):
        line = content[i].split(' ')
        res  = answer[i].split(' ')
        
        if(line != res):
            newContent.append(f'{" ".join(line).replace('\n', '')} ----------- {" ".join(res)}')
            errors += 1
        else: 
            newContent.append(f'{" ".join(line)}')

    file.close()

    file = open(filePath, 'w')

    file.write("".join(newContent))
    file.close()

    newFilePath = f"{filePath.replace(".txt",'')}  ({lines - errors} - {lines}).txt"
    os.rename(filePath, newFilePath)
        
    

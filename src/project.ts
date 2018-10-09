import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Uri } from 'vscode';
import { VSCodeUI } from './VSCodeUI';
import * as content from './content';

export namespace project {
    export function createFiles(type: string, location: string) {
        if (process.platform === 'win32') {
            content.launch_json.configurations[0].program += '.exe';
            content.tasks_json.tasks[0].args[1] = 'mingw32-make';
            content.tasks_json.tasks[1].args[1] = 'mingw32-make run';
            content.tasks_json.tasks[2].args[1] = 'mingw32-make clean';
        }

        try {
            fs.writeFileSync(path.join(location, '.vscode', 'tasks.json'), JSON.stringify(content.tasks_json, null, 4));
            
            switch (type) {
                case 'c':
                    fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), JSON.stringify(content.launch_json, null, 4));
                    
                    fs.writeFileSync(path.join(location, 'src', 'main.c'), content.main_c);
                    fs.writeFileSync(path.join(location, 'Makefile'), content.makefile_c);
                    break;
                case 'cpp':
                    fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), JSON.stringify(content.launch_json, null, 4));
                    
                    fs.writeFileSync(path.join(location, 'src', 'main.cpp'), content.main_cpp);
                    fs.writeFileSync(path.join(location, 'Makefile'), content.makefile_cpp);
                    break;
                case 'OF':
                    fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), JSON.stringify(content.launch_json_OF, null, 4));

                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/config.make',path.join(location, 'config.make'),{ overwrite: false });
                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/Makefile',path.join(location, 'Makefile'),{ overwrite: false });
                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/addons.make',path.join(location, 'addons.make'),{ overwrite: false });
                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/src/ofApp.cpp',path.join(location, 'src','ofApp.cpp'),{ overwrite: false });
                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/src/ofApp.h',path.join(location, 'src','ofApp.h'),{ overwrite: false });
                    fs.copySync('/mnt/LinuxData/OF/openFrameworks/scripts/templates/linuxarmv6l/src/main.cpp',path.join(location, 'src','main.cpp'),{ overwrite: false });
                    break;
                default:
                    console.log('Invalid file type');
            }
        } catch (err) {
            console.error(err);
        }
    }


    export function createFolders(type: string, location: string): void {
        if (type === 'OF') {
            content.directories_OF.forEach(function (dir: string) {
                try {
                    fs.ensureDirSync(path.join(location, dir));
                } catch (err) {
                    console.error(err);
                }
            });
        }
        else {
            content.directories.forEach(function (dir: string) {
                try {
                    fs.ensureDirSync(path.join(location, dir));
                } catch (err) {
                    console.error(err);
                }
            });
        }
    }

    export async function createProject(type: string) {
        const result: Uri = await VSCodeUI.openDialogForFolder();
        if (result && result.fsPath) {
            await vscode.commands.executeCommand('vscode.openFolder', result);
            createFolders(type, result.fsPath);
            createFiles(type, result.fsPath);
        }
    }
}
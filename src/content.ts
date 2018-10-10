export const tasks_json: any = { "version": "2.0.0", "tasks": [{ "label": "build", "type": "shell", "group": { "kind": "build", "isDefault": true }, "windows": { "command": "powershell" }, "linux": { "command": "bash" }, "args": ["-c", "make"] }, { "label": "build & run", "type": "shell", "group": { "kind": "test", "isDefault": true }, "windows": { "command": "powershell" }, "linux": { "command": "bash" }, "args": ["-c", "'make run'"] }, { "label": "clean", "type": "shell", "windows": { "command": "powershell" }, "linux": { "command": "bash" }, "args": ["-c", "'make clean'"] }] };
export const launch_json: any = { "version": "0.2.0", "configurations": [{ "name": "Debug", "type": "cppdbg", "request": "launch", "program": "${workspaceFolder}/bin/main", "args": [], "stopAtEntry": false, "cwd": "${workspaceRoot}", "environment": [], "externalConsole": true, "preLaunchTask": "build", "linux": { "MIMode": "gdb" }, "osx": { "MIMode": "lldb" }, "windows": { "MIMode": "gdb" } }] };
export const makefile_c: string = 'CC\t\t:= gcc\nC_FLAGS := -Wall -Wextra\n\nBIN\t\t:= bin\nSRC\t\t:= src\nINCLUDE\t:= include\nLIB\t\t:= lib\n\nLIBRARIES\t:=\n\nifeq ($(OS),Windows_NT)\nEXECUTABLE\t:= main.exe\nelse\nEXECUTABLE\t:= main\nendif\n\nall: $(BIN)/$(EXECUTABLE)\n\nclean:\n\t-$(RM) $(BIN)/$(EXECUTABLE)\n\nrun: all\n\t./$(BIN)/$(EXECUTABLE)\n\n$(BIN)/$(EXECUTABLE): $(SRC)/*\n\t$(CC) $(C_FLAGS) -I$(INCLUDE) -L$(LIB) $^ -o $@ $(LIBRARIES)';
export const makefile_cpp: string = 'CC\t\t:= g++\nC_FLAGS := -std=c++17 -Wall -Wextra\n\nBIN\t\t:= bin\nSRC\t\t:= src\nINCLUDE\t:= include\nLIB\t\t:= lib\n\nLIBRARIES\t:=\n\nifeq ($(OS),Windows_NT)\nEXECUTABLE\t:= main.exe\nelse\nEXECUTABLE\t:= main\nendif\n\nall: $(BIN)/$(EXECUTABLE)\n\nclean:\n\t$(RM) $(BIN)/$(EXECUTABLE)\n\nrun: all\n\t./$(BIN)/$(EXECUTABLE)\n\n$(BIN)/$(EXECUTABLE): $(SRC)/*\n\t$(CC) $(C_FLAGS) -I$(INCLUDE) -L$(LIB) $^ -o $@ $(LIBRARIES)';
export const main_cpp: string = '#include <iostream>\n\nint main(int argc, char *argv[]) {\n\tstd::cout << "Hello Easy C++ project!" << std::endl;\n}';
export const main_c: string = '#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\tprintf("Hello World");\n}';
export const directories: string[] = new Array(".vscode", "bin", "include", "lib", "src");

/************
 * OF PROJECT
 ***********/
export const directories_OF: string[] = new Array(".vscode", "addons", "bin/data", "src");
export const launch_json_OF: any = {
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug",
            "type": "cppdbg",
            "request": "launch",
            "program": "/usr/bin/make",
            "args": [
                "RunDebug"
            ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                { "name": "OF_ROOT",
                    "value": "/mnt/LinuxData/OF/openFrameworks",
                }
            ],
            "externalConsole": true,
            "preLaunchTask": "build",
            "linux": {
                "MIMode": "gdb"
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb"
            }
        },
        {
            "name": "RPI3 Cross Debug",
            "type": "cppdbg",
            "request": "launch",
            "program": "/bin/bash",
            "args": [
                "-c",
                "ssh -X pi@Rpi3Dev.local 'xterm -T ${workspaceFolderBasename}_armv7l -e' make -C ${workspaceFolder} RunDebug PLATFORM_ARCH='armv7l' PLATFORM_VARIANT='stretch' GST_VERSION='1.0'"
            ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                { "name": "OF_ROOT",
                    "value": "/mnt/LinuxData/OF/openFrameworks",
                }
            ],
            "externalConsole": true,
            "preLaunchTask": "RPI3 Cross build",
            "linux": {
                "MIMode": "gdb"
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb"
            }
        },
        {
            "name": "RPI Cross Debug",
            "type": "cppdbg",
            "request": "launch",
            "program": "/bin/bash",
            "args": [
                "-c",
                "ssh -X pi@Rpi3Dev.local 'xterm -T ${workspaceFolderBasename}_armv7l -e' make -C ${workspaceFolder} RunDebug PLATFORM_ARCH='armv6l' PLATFORM_VARIANT='stretch' GST_VERSION='1.0'"
            ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                { "name": "OF_ROOT",
                    "value": "/mnt/LinuxData/OF/openFrameworks",
                }
            ],
            "externalConsole": true,
            "preLaunchTask": "RPI Cross build",
            "linux": {
                "MIMode": "gdb"
            },
            "osx": {
                "MIMode": "lldb"
            },
            "windows": {
                "MIMode": "gdb"
            }
        }
    ]
};
export const tasks_json_OF: any = {
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "windows": {
                "command": "powershell"
            },
            "linux": {
                "command": "bash"
            },
            "args": [
                "-c",
                "'make Debug'"
            ]
        },
        {
            "label": "RPI Cross build",
            "type": "shell",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "windows": {
                "command": "powershell"
            },
            "linux": {
                "command": "bash"
            },
            "args": [
                "-c",
                "'PLATFORM_ARCH=armv6l GST_VERSION=1.0 TOOLCHAIN_ROOT=/mnt/LinuxData/Scripts/CrossRpi/rpi_toolchain-gcc6 RPI_ROOT=/opt/Rpi3DevRootfs PLATFORM_VARIANT=stretch make Debug'"
            ]
        },
        {
            "label": "RPI3 Cross build",
            "type": "shell",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "windows": {
                "command": "powershell"
            },
            "linux": {
                "command": "bash"
            },
            "args": [
                "-c",
                "'PLATFORM_ARCH=armv7l GST_VERSION=1.0 TOOLCHAIN_ROOT=/mnt/LinuxData/Scripts/CrossRpi/rpi_toolchain-gcc6 RPI_ROOT=/opt/Rpi3DevRootfs PLATFORM_VARIANT=stretch make Debug'"
            ]
        },
        {
            "label": "build & run",
            "type": "shell",
            "group": {
                "kind": "test",
                "isDefault": true
            },
            "windows": {
                "command": "powershell"
            },
            "linux": {
                "command": "bash"
            },
            "args": [
                "-c",
                "'make run'"
            ]
        },
        {
            "label": "clean",
            "type": "shell",
            "windows": {
                "command": "powershell"
            },
            "linux": {
                "command": "bash"
            },
            "args": [
                "-c",
                "'make clean'"
            ]
        }
    ]
};
//# sourceMappingURL=OF_content.js.map
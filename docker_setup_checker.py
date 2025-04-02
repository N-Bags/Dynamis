#!/usr/bin/env python3

import subprocess
import sys
import platform
import os
from typing import Tuple, Optional, Dict

def run_command(command: str) -> Tuple[bool, str]:
    """
    Run a shell command and return whether it succeeded and its output.
    
    Args:
        command: The shell command to run
        
    Returns:
        Tuple of (success boolean, output string)
    """
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def check_docker_permissions() -> bool:
    """
    Check if the current user has proper Docker permissions.
    
    Returns:
        bool: True if permissions are correct, False otherwise
    """
    print("\n=== Checking Docker Permissions ===")
    
    # Try to run a simple Docker command that requires permissions
    success, output = run_command("docker ps")
    
    if success:
        print("✅ Docker permissions are correctly configured!")
        return True
    else:
        print("❌ Docker permission issues detected!")
        print("\nCommon Permission Issues and Solutions:")
        
        if platform.system() == "Windows":
            print("\nWindows-specific solutions:")
            print("1. Make sure Docker Desktop is running")
            print("2. Check if you're in the 'docker-users' group:")
            print("   a. Open Computer Management")
            print("   b. Navigate to System Tools > Local Users and Groups > Groups")
            print("   c. Find 'docker-users' group")
            print("   d. Add your user account if not present")
            print("3. Restart Docker Desktop after making changes")
            print("4. If using WSL2, ensure it's properly configured:")
            print("   a. Open PowerShell as Administrator")
            print("   b. Run: wsl --update")
            print("   c. Restart your computer")
        elif platform.system() == "Darwin":  # macOS
            print("\nmacOS-specific solutions:")
            print("1. Make sure Docker Desktop is running")
            print("2. Check if you're in the 'docker' group:")
            print("   a. Open Terminal")
            print("   b. Run: groups")
            print("   c. If 'docker' is not listed, run:")
            print("      sudo usermod -aG docker $USER")
            print("3. Restart Docker Desktop")
        else:  # Linux
            print("\nLinux-specific solutions:")
            print("1. Add your user to the 'docker' group:")
            print("   sudo usermod -aG docker $USER")
            print("2. Apply the changes:")
            print("   newgrp docker")
            print("3. Verify the group was added:")
            print("   groups")
            print("4. Restart the Docker daemon:")
            print("   sudo systemctl restart docker")
        
        return False

def check_docker_networks() -> None:
    """
    Check Docker network status and display information about available networks.
    """
    print("\n=== Checking Docker Networks ===")
    success, output = run_command("docker network ls")
    
    if success:
        print("Available Docker Networks:")
        print(output)
        print("\nNetwork Types Explained:")
        print("- bridge: Default network for containers")
        print("- host: Uses host's network directly")
        print("- none: No network access")
        print("- overlay: For Docker Swarm")
    else:
        print("❌ Unable to check Docker networks.")
        print("This might be because:")
        print("1. Docker daemon is not running")
        print("2. Permission issues")
        print("3. Docker service needs to be restarted")

def check_docker_volumes() -> None:
    """
    Check Docker volume status and display information about available volumes.
    """
    print("\n=== Checking Docker Volumes ===")
    success, output = run_command("docker volume ls")
    
    if success:
        print("Available Docker Volumes:")
        print(output)
        print("\nVolume Information:")
        print("- Volumes are used to persist data")
        print("- Named volumes are preferred over bind mounts")
        print("- Anonymous volumes are created automatically")
    else:
        print("❌ Unable to check Docker volumes.")
        print("This might be because:")
        print("1. Docker daemon is not running")
        print("2. Permission issues")
        print("3. Docker service needs to be restarted")

def check_docker() -> bool:
    """
    Check if Docker is installed and working.
    
    Returns:
        bool: True if Docker is installed and working, False otherwise
    """
    print("\n=== Checking Docker Installation ===")
    success, output = run_command("docker version")
    
    if success:
        print("✅ Docker is installed and working correctly!")
        print("\nDocker Version Information:")
        print(output)
        return True
    else:
        print("❌ Docker is not installed or not working correctly.")
        print("\nDetailed Installation Instructions:")
        
        if platform.system() == "Windows":
            print("\nWindows Installation Steps:")
            print("1. System Requirements:")
            print("   - Windows 10/11 Pro, Enterprise, or Education")
            print("   - WSL 2 enabled")
            print("   - Virtualization enabled in BIOS")
            print("   - At least 4GB RAM")
            print("\n2. Installation Process:")
            print("   a. Download Docker Desktop from https://www.docker.com/products/docker-desktop")
            print("   b. Run the installer (Docker Desktop Installer.exe)")
            print("   c. During installation, ensure 'Use WSL 2 instead of Hyper-V' is selected")
            print("   d. Complete the installation")
            print("   e. Restart your computer")
            print("\n3. Post-Installation:")
            print("   a. Start Docker Desktop")
            print("   b. Wait for Docker to finish starting")
            print("   c. Open PowerShell and run: docker --version")
            print("\n4. Troubleshooting:")
            print("   - If Docker fails to start, check Windows Features:")
            print("     a. Open Control Panel > Programs > Turn Windows features on or off")
            print("     b. Enable 'Windows Subsystem for Linux' and 'Virtual Machine Platform'")
            print("   - If WSL 2 is not working, run in PowerShell as Administrator:")
            print("     wsl --update")
            print("     wsl --set-default-version 2")
        elif platform.system() == "Darwin":  # macOS
            print("\nmacOS Installation Steps:")
            print("1. System Requirements:")
            print("   - macOS 10.15 or newer")
            print("   - At least 4GB RAM")
            print("\n2. Installation Process:")
            print("   a. Download Docker Desktop from https://www.docker.com/products/docker-desktop")
            print("   b. Open the downloaded .dmg file")
            print("   c. Drag Docker.app to your Applications folder")
            print("   d. Open Docker Desktop from your Applications folder")
            print("\n3. Post-Installation:")
            print("   a. Wait for Docker to finish starting")
            print("   b. Open Terminal and run: docker --version")
            print("\n4. Troubleshooting:")
            print("   - If Docker fails to start, check System Preferences > Security & Privacy")
            print("   - Make sure Docker has necessary permissions")
        else:  # Linux
            print("\nLinux Installation Steps:")
            print("1. Remove any old versions:")
            print("   sudo apt-get remove docker docker-engine docker.io containerd runc")
            print("\n2. Install required packages:")
            print("   sudo apt-get update")
            print("   sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release")
            print("\n3. Add Docker's official GPG key:")
            print("   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg")
            print("\n4. Set up the stable repository:")
            print("   echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable' | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null")
            print("\n5. Install Docker Engine:")
            print("   sudo apt-get update")
            print("   sudo apt-get install -y docker-ce docker-ce-cli containerd.io")
            print("\n6. Post-Installation:")
            print("   sudo usermod -aG docker $USER")
            print("   newgrp docker")
            print("\n7. Verify installation:")
            print("   docker --version")
            print("   docker run hello-world")
        return False

def check_docker_compose() -> Optional[str]:
    """
    Check if Docker Compose is installed and determine which command to use.
    
    Returns:
        Optional[str]: The working Docker Compose command ('docker-compose' or 'docker compose')
                      or None if neither works
    """
    print("\n=== Checking Docker Compose Installation ===")
    
    # Try 'docker-compose' command
    success, output = run_command("docker-compose version")
    if success:
        print("✅ Docker Compose is installed and working (using 'docker-compose' command)")
        print("\nDocker Compose Version Information:")
        print(output)
        return "docker-compose"
    
    # Try 'docker compose' command
    success, output = run_command("docker compose version")
    if success:
        print("✅ Docker Compose is installed and working (using 'docker compose' command)")
        print("\nDocker Compose Version Information:")
        print(output)
        return "docker compose"
    
    print("❌ Docker Compose is not installed or not working correctly.")
    print("\nDetailed Installation Instructions:")
    
    if platform.system() == "Windows":
        print("\nWindows-specific solutions:")
        print("1. Docker Compose comes with Docker Desktop")
        print("2. If Docker Desktop is installed but Compose isn't working:")
        print("   a. Open Docker Desktop")
        print("   b. Click the gear icon (Settings)")
        print("   c. Go to 'Docker Engine'")
        print("   d. Make sure 'compose' is in the enabled features")
        print("   e. Click 'Apply & Restart'")
        print("3. If still not working:")
        print("   a. Uninstall Docker Desktop")
        print("   b. Delete %APPDATA%\\Docker Desktop")
        print("   c. Reinstall Docker Desktop")
    elif platform.system() == "Darwin":  # macOS
        print("\nmacOS-specific solutions:")
        print("1. Docker Compose comes with Docker Desktop")
        print("2. If Docker Desktop is installed but Compose isn't working:")
        print("   a. Open Docker Desktop")
        print("   b. Click the gear icon (Settings)")
        print("   c. Go to 'Docker Engine'")
        print("   d. Make sure 'compose' is in the enabled features")
        print("   e. Click 'Apply & Restart'")
    else:  # Linux
        print("\nLinux-specific solutions:")
        print("1. Install Docker Compose:")
        print("   sudo curl -L 'https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-linux-x86_64' -o /usr/local/bin/docker-compose")
        print("2. Make it executable:")
        print("   sudo chmod +x /usr/local/bin/docker-compose")
        print("3. Verify installation:")
        print("   docker-compose --version")
    return None

def check_running_containers(compose_command: str) -> None:
    """
    Check for running Docker containers.
    
    Args:
        compose_command: The Docker Compose command to use ('docker-compose' or 'docker compose')
    """
    print("\n=== Checking Running Containers ===")
    success, output = run_command(f"{compose_command} ps")
    
    if success:
        print("Current Docker containers status:")
        print(output)
        print("\nContainer Status Explained:")
        print("- Up: Container is running")
        print("- Exited: Container has stopped")
        print("- Created: Container has been created but not started")
        print("- Paused: Container is paused")
    else:
        print("❌ Unable to check running containers.")
        print("\nThis might be because:")
        print("1. No Docker Compose project is running")
        print("2. You're not in a directory with a docker-compose.yml file")
        print("3. There might be permission issues")
        print("\nTroubleshooting Steps:")
        print("1. Check if you're in the correct directory:")
        print("   ls docker-compose.yml")
        print("2. Check Docker service status:")
        if platform.system() == "Windows":
            print("   Get-Service docker")
        else:
            print("   sudo systemctl status docker")
        print("3. Try running with sudo (Linux/macOS) or as Administrator (Windows)")

def main():
    """
    Main function to check Docker and Docker Compose setup.
    """
    print("🔍 Starting Docker Setup Check...")
    
    # Check Docker installation
    docker_installed = check_docker()
    if not docker_installed:
        print("\n⚠️ Please install Docker before proceeding.")
        sys.exit(1)
    
    # Check Docker permissions
    permissions_ok = check_docker_permissions()
    if not permissions_ok:
        print("\n⚠️ Please fix Docker permissions before proceeding.")
        sys.exit(1)
    
    # Check Docker Compose installation
    compose_command = check_docker_compose()
    if not compose_command:
        print("\n⚠️ Please install Docker Compose before proceeding.")
        sys.exit(1)
    
    # Check Docker networks
    check_docker_networks()
    
    # Check Docker volumes
    check_docker_volumes()
    
    # Check running containers
    check_running_containers(compose_command)
    
    print("\n✨ Docker Setup Check Complete!")
    print("\nNext Steps:")
    print("1. If all checks passed, you're ready to use Docker!")
    print("2. If any checks failed, follow the provided instructions to resolve the issues")
    print("3. After fixing any issues, run this script again to verify")

if __name__ == "__main__":
    main() 
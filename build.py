import sys

def replace_string_in_file(file_path, tag):
    try:
        with open(file_path, 'r') as file:
            file_content = file.read()
            old_string = r"{tag}"
        
        updated_content = file_content.replace(old_string, tag)
        
        with open("kal_kub.yml", 'w') as file:
            file.write(updated_content)
        
        print(f'String "{old_string}" replaced with "{tag}" in file: kal_kub.yml')
    except FileNotFoundError:
        print(f'Error: File not found - {file_path}')
    except Exception as e:
        print(f'An error occurred: {e}')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <file_path> <old_string> <new_string>")
    else:
        tag = sys.argv[1]
        # old_string = sys.argv[2]
        # new_string = sys.argv[3]
        file_path = "deployment/temp.tpl"
        replace_string_in_file(file_path, tag)

import os
import json
import glob
import re

POSTS_DIR = 'posts'
OUTPUT_FILE = os.path.join(POSTS_DIR, 'metadata.json')

def parse_front_matter(content):
    """
    Parses YAML-like front matter from the content.
    Returns metadata dict and the rest of the content.
    """
    # Simple regex to find content between first two ---
    match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}, content

    raw_fm = match.group(1)
    metadata = {}
    for line in raw_fm.split('\n'):
        line = line.strip()
        if ':' in line:
            key, val = line.split(':', 1)
            key = key.strip()
            val = val.strip()
            
            # Handle list strings like ["a", "b"]
            if val.startswith('[') and val.endswith(']'):
                # Simple parsing for simple lists
                val = [x.strip().strip('"').strip("'") for x in val[1:-1].split(',') if x.strip()]
            
            # Handle boolean
            if isinstance(val, str):
                if val.lower() == 'true': val = True
                elif val.lower() == 'false': val = False
            
            # Handle quoted strings
            if isinstance(val, str) and (val.startswith('"') or val.startswith("'")):
                val = val[1:-1]
                
            metadata[key] = val
            
    return metadata, content[match.end():]

def main():
    if not os.path.exists(POSTS_DIR):
        print(f"Error: {POSTS_DIR} directory not found.")
        return

    posts = []
    # Search recursively for .md files
    md_files = glob.glob(os.path.join(POSTS_DIR, '**/*.md'), recursive=True)
    
    print(f"Scanning {len(md_files)} files...")

    for filepath in md_files:
        filename = os.path.basename(filepath)
        if filename == 'metadata.json':
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        meta, _ = parse_front_matter(content)
        
        # Required fields check
        if not meta:
            print(f"Skipping {filename}: No Front Matter found")
            continue
            
        # Repository contains flat files in posts/ directory
        meta['file'] = filename
        
        # Ensure tags is list
        if 'tags' not in meta:
            meta['tags'] = []
            
        # Ensure date is formatted as YYYY-MM-DD for correct lexicographical sorting and browser compatibility
        if 'date' in meta:
            date_parts = meta['date'].split('-')
            if len(date_parts) == 3:
                try:
                    year = int(date_parts[0])
                    month = int(date_parts[1])
                    day = int(date_parts[2])
                    meta['date'] = f"{year:04d}-{month:02d}-{day:02d}"
                except ValueError:
                    pass
            
        posts.append(meta)

    # Sort by date descending, and then by id descending for stable sorting
    posts.sort(key=lambda x: (x.get('date', ''), x.get('id', '')), reverse=True)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=4, ensure_ascii=False)
        
    print(f"Successfully generated {OUTPUT_FILE} with {len(posts)} posts.")

if __name__ == "__main__":
    main()

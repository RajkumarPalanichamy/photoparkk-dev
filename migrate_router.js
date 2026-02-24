
const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        try {
            if (fs.statSync(dirFile).isDirectory()) {
                filelist = walkSync(dirFile, filelist);
            } else {
                if (file.endsWith('.jsx') || file.endsWith('.js')) {
                    filelist.push(dirFile);
                }
            }
        } catch (err) {
            console.log(`Skipping ${dirFile}: ${err.message}`);
        }
    });
    return filelist;
};

const migrateFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace Link
    if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+{.*Link.*}\s+from\s+["']react-router-dom["'];?/g, (match) => {
            if (match.includes('NavLink')) return 'import Link from "next/link";'; // Simplification
            return 'import Link from "next/link";';
        });

        // Replace useNavigate
        content = content.replace(/import\s+{.*useNavigate.*}\s+from\s+["']react-router-dom["'];?/g, 'import { useRouter } from "next/navigation";');
        content = content.replace(/const navigate = useNavigate\(\);/g, 'const router = useRouter();');
        content = content.replace(/navigate\(/g, 'router.push(');

        // Replace useLocation (generic, might need manual check for search params)
        if (content.includes('useLocation')) {
            content = content.replace(/import\s+{.*useLocation.*}\s+from\s+["']react-router-dom["'];?/g, 'import { usePathname } from "next/navigation";');
            content = content.replace(/const location = useLocation\(\);/g, 'const pathname = usePathname();');
            content = content.replace(/location.pathname/g, 'pathname');
        }

        // Clean up double imports of next/navigation or link if they happened
        // (This is a naive script, so we might need manual cleanup, but it helps)
    }

    // Fix Image imports if needed, or leave for now.

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
};

const componentsDir = path.join(__dirname, 'src', 'Components');
const pagesDir = path.join(__dirname, 'src', 'Pages');

try {
    const componentFiles = walkSync(componentsDir);
    componentFiles.forEach(migrateFile);
} catch (e) {
    console.log("Components dir might not exist or error:", e.message);
}

// Pages folder is also there, although we are moving them to app directory, we might reference them.
try {
    const pageFiles = walkSync(pagesDir);
    pageFiles.forEach(migrateFile);
} catch (e) {
    console.log("Pages dir might not exist or error:", e.message);
}

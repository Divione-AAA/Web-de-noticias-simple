import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'post');

const readMarkdownFiles = (directory: string): string[] => {
    try {
        const files = fs.readdirSync(directory);
        const markdownFiles = files.filter(file => path.extname(file) === '.md');
        const fileContents = markdownFiles.map(file => fs.readFileSync(path.join(directory, file), 'utf-8'));
        console.log("Archivos Markdown leídos:", markdownFiles);
        return fileContents;
    } catch (error) {
        console.error("Error al leer los archivos Markdown:", error);
        return [];
    }
};

const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
    try {
        const result = await remark().use(html).process(markdown);
        console.log("Markdown convertido a HTML:", result.toString());
        return result.toString();
    } catch (error) {
        console.error("Error al convertir Markdown a HTML:", error);
        return '';
    }
};

export const getAllPosts = async (): Promise<string[]> => {
    const markdownContents = readMarkdownFiles(postsDirectory);
    const posts = await Promise.all(markdownContents.map(content => convertMarkdownToHtml(content)));
    console.log("Posts convertidos a HTML:", posts);
    return posts;
};

import React, { useRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

function CustomRichEditor({ value = "", onChange }) {
    const editorRef = useRef(null);
    const [viewSource, setViewSource] = useState(false);
    const [sourceContent, setSourceContent] = useState(value);

    // Sync external value to contentEditable div
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
        setSourceContent(value || "");
    }, [value]);

    const execCmd = (command, value = null) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
            setSourceContent(html);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
            setSourceContent(html);
        }
    };

    const handleSourceChange = (e) => {
        const text = e.target.value;
        setSourceContent(text);
        onChange(text);
        if (editorRef.current) {
            editorRef.current.innerHTML = text;
        }
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-slate-950 border-b border-slate-800/80 text-xs">
                <div className="flex flex-wrap items-center gap-1">
                    <button
                        type="button"
                        onClick={() => execCmd('bold')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
                        title="Bold"
                    >
                        B
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('italic')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white italic transition cursor-pointer"
                        title="Italic"
                    >
                        I
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('underline')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white underline transition cursor-pointer"
                        title="Underline"
                    >
                        U
                    </button>
                    <span className="w-px h-4 bg-slate-800 mx-1"></span>
                    <button
                        type="button"
                        onClick={() => execCmd('formatBlock', '<h2>')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-semibold transition cursor-pointer"
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('formatBlock', '<h3>')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
                        title="Heading 3"
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('formatBlock', '<p>')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        title="Paragraph"
                    >
                        P
                    </button>
                    <span className="w-px h-4 bg-slate-800 mx-1"></span>
                    <button
                        type="button"
                        onClick={() => execCmd('insertUnorderedList')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition cursor-pointer"
                        title="Bullet List"
                    >
                        • List
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('insertOrderedList')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition cursor-pointer"
                        title="Numbered List"
                    >
                        1. List
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('formatBlock', '<blockquote>')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-400 transition cursor-pointer"
                        title="Quote"
                    >
                        “ Quote
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            const url = prompt("Enter link URL:");
                            if (url) execCmd('createLink', url);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-indigo-400 transition cursor-pointer"
                        title="Link"
                    >
                        🔗 Link
                    </button>
                    <button
                        type="button"
                        onClick={() => execCmd('removeFormat')}
                        className="px-2 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 transition cursor-pointer"
                        title="Clear Format"
                    >
                        Clear
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setViewSource(!viewSource)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-800/60 text-indigo-300 hover:text-white transition text-xs font-semibold cursor-pointer"
                >
                    {viewSource ? "Visual Editor" : "HTML Source"}
                </button>
            </div>

            {/* Editable Content Container */}
            {!viewSource ? (
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="w-full min-h-[350px] p-4 text-slate-100 outline-none focus:ring-0 text-sm leading-relaxed prose prose-invert max-w-none font-sans"
                    style={{ minHeight: "350px" }}
                />
            ) : (
                <textarea
                    value={sourceContent}
                    onChange={handleSourceChange}
                    rows={14}
                    className="w-full p-4 bg-slate-950 text-indigo-300 font-mono text-xs outline-none border-none resize-y"
                    placeholder="Enter HTML raw code..."
                />
            )}
        </div>
    );
}

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    {label}
                </label>
            )}
            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <CustomRichEditor value={value} onChange={onChange} />
                )}
            />
        </div>
    );
}

export default RTE;
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SelectBtn, RTE } from "../index.js";
import dbService from "../../appwrite/database.service.js";
import storageService from "../../appwrite/storage.service.js";
import { saveLocalDemoPost } from "../../utils/demoPosts.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        setError("");

        try {
            let fileId = post?.featuredImage || post?.featuredimage || "";

            if (data.image && data.image[0]) {
                const uploadedFile = await storageService.uploadFile(data.image[0]);
                if (uploadedFile) {
                    const existingImage = post?.featuredImage || post?.featuredimage;
                    if (existingImage && !existingImage.startsWith("http")) {
                        await storageService.deleteFile(existingImage);
                    }
                    fileId = uploadedFile.$id;
                }
            }

            if (post) {
                const dbPost = await dbService.updatePost(post.$id || post.slug, {
                    ...data,
                    featuredImage: fileId,
                });
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    // Fallback to local storage update
                    saveLocalDemoPost({
                        ...post,
                        ...data,
                        featuredImage: fileId || post.featuredImage || post.featuredimage || ""
                    });
                    navigate(`/post/${post.$id || post.slug}`);
                }
            } else {
                const slugId = data.slug || data.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
                let dbPost = null;
                
                try {
                    dbPost = await dbService.createPost({
                        ...data,
                        slug: slugId,
                        featuredImage: fileId,
                        userId: userData?.$id || "user-1",
                    });
                } catch (err) {
                    console.log("Appwrite create post failed, saving locally", err);
                }

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    const newPost = {
                        $id: slugId,
                        slug: slugId,
                        title: data.title,
                        content: data.content,
                        featuredImage: fileId || "",
                        status: data.status,
                        userId: userData?.$id || "demo-user",
                        authorName: userData?.name || "Anonymous",
                        readTime: "3 min read",
                        createdAt: new Date().toISOString().split("T")[0]
                    };
                    saveLocalDemoPost(newPost);
                    navigate(`/post/${slugId}`);
                }
            }
        } catch (err) {
            setError(err.message || "An error occurred while saving the post.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-3">
            {error && (
                <div className="w-full px-3 mb-6">
                    <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm">
                        {error}
                    </div>
                </div>
            )}
            
            <div className="w-full lg:w-2/3 px-3 space-y-6">
                <Input
                    label="Article Title :"
                    placeholder="Enter article title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="URL Slug :"
                    placeholder="article-slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE 
                    label="Article Body Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                />
            </div>

            <div className="w-full lg:w-1/3 px-3 mt-6 lg:mt-0 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-6">
                    <Input
                        label="Featured Cover Image (Optional) :"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                        {...register("image", { required: false })}
                    />
                    
                    {post && (post.featuredImage || post.featuredimage) && (
                        <div className="w-full overflow-hidden rounded-xl border border-slate-800">
                            <img
                                src={storageService.getFilePreview(post.featuredImage || post.featuredimage)}
                                alt={post.title}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    )}

                    <SelectBtn
                        options={["active", "inactive"]}
                        label="Visibility Status :"
                        {...register("status", { required: true })}
                    />

                    <Button 
                        type="submit" 
                        disabled={loading} 
                        bgColor={post ? "bg-emerald-600 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-500"} 
                        className="w-full py-3"
                    >
                        {loading ? "Saving..." : post ? "Update Article" : "Publish Article"}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default PostForm;
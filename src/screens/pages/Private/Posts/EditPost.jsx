import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { BlogContext } from '../../../../contexts/BlogContext';
import { Editor } from '@tinymce/tinymce-react';

// Service
import { update } from '../../../../services/BlogService';

const HtmlToReact = require('html-to-react').Parser;
const htmlToReact = new HtmlToReact();

const EditPost = (props) => {
    console.log('EDIT');
    const { blogs, dispatch } = useContext(BlogContext);
    const { data: posts } = blogs;
    const [selectedPost, setSelectedPost] = useState({
        title: '',
        blog_image: '',
        content: ''
    });
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const currentUserId = props.match.params.id;
    let history = useHistory();

    useEffect(() => {
        console.log('useEffect EDIT');
        const selectPost = posts.find(post => post.id === parseInt(currentUserId));
        setSelectedPost(selectPost);
        setContent(htmlToReact.parse(selectPost.content));
        console.log(selectPost);
    }, [posts, currentUserId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title', selectedPost.title);
        formData.append('content', content);
        formData.append('blog_image', image);

        try {
            update(currentUserId, formData).then(result => {
                const { data } = result;
                
                const dataUpdated = {
                    ...selectedPost,
                    title: data.title,
                    blog_image: data.blog_image,
                    content: data.content,
                }
    
                dispatch({ type: 'EDIT', payload: dataUpdated });
            });
        } catch (error) {
            console.log('gagal update data ' + error);
        }

        history.push('/post/home');
    }

    const handleChangeImage = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleLoadImage = () => URL.revokeObjectURL(previewImage);

    const handleEditorChange = (content, editor) => setContent(content);

    const handleOnChange = (userKey, value) => setSelectedPost({...selectedPost, [userKey]: value});

    return (
        <div>
            <h1>Edit Post</h1>

            <div style={{ marginTop: '30px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTittleId">
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Title..." value={selectedPost.title} onChange={e => handleOnChange("title", e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <img src={`https://blog-api-jcdev.herokuapp.com/${selectedPost.blog_image}`} style={{ width: '250px' }} alt="" />
                        <img src={previewImage} onLoad={handleLoadImage} style={{ width: '250px' }} alt="" />
                        <Form.File id="exampleFormControlFile1" label="Image" onChange={handleChangeImage} />
                    </Form.Group>

                    <Form.Group controlId="formContentId">
                        <Form.Label>Content</Form.Label>
                        <Editor
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    `undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help`
                            }}
                            onEditorChange={handleEditorChange}
                            value={content}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">Submit</Button>
                </Form>
            </div>
        </div>
    );
}
 
export default EditPost;
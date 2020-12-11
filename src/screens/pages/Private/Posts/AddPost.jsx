import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BlogContext } from '../../../../contexts/BlogContext';
import { Editor } from '@tinymce/tinymce-react';

const style = {
    marginTop: '50px',
    width: '100%',
    minHeight: '100vh'
}

const AddPost = () => {

    const {dispatch} = useContext(BlogContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        formData.append('blog_image', image);
        
        try {

            const accessToken = localStorage.getItem('access-token');
            if (!accessToken) {
                return Promise.reject();
            }

            const res = await axios.post('https://blog-api-jcdev.herokuapp.com/api/v1/blog',
                formData
                ,{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': `multipart/form-data`
                    }
                }
            );

            const result = await res.data;
            dispatch({ 
                type: 'CREATE',
                payload: result.data
            })

            console.log(result);

            setTitle('');
            setContent('');
            setImage('');
            setPreviewImage('');

            history.push('/post/home');
            
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleChangeImage = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const handleLoadImage = () => {
        URL.revokeObjectURL(previewImage);
        console.log(previewImage);
        
        console.log('bro');
        
    }

    const handleEditorChange = (content, editor) => {
        setContent(content);
    }

    return (
        <div style={style}>
            <h1>Add Post</h1>

            <div style={{ marginTop: '30px' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTittleId">
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
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
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">Submit</Button>
                </Form>
            </div>
        </div>
    );
}
 
export default AddPost;
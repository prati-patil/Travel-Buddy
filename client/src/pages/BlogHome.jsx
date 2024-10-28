import * as React from 'react';
import Button from '@mui/material/Button';
import Home from '../components/blog/pages/Home'
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Center from '../animated-components/Center';

const BlogHome = () => {
    const navigate = useNavigate()
    function goToAddBlog() {
        navigate("/AddBlog")
    }
    return (
        <div className="w-full h-full p-4">
            {/* <Button variant="contained" onClick={goToAddBlog} className=" items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add a new blog
            </Button> */}
            <Center>
            <Home />
            <IconButton onClick={goToAddBlog} 
            className='hover:!bg-[#5677fc]'
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 100,
                backgroundColor: '#3f51b5',
                color: 'white'
                // hover background colour change
            }}>
                <AddOutlinedIcon sx={{
                    fontSize: 40
                }} />
            </IconButton>
            </Center>
        </div>
    );
};

export default BlogHome;
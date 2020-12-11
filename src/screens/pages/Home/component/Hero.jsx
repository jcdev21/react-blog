import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AOS from 'aos';

// Hero Image
import { ReactComponent as HeroImage } from '../../../../assets/Images/undraw_publish_article_icso.svg';

// Components
import Title from '../../../../component/Task/Title';
import SelectInput from '../../../../component/Form-controls/SelectInput';
import TextInput from '../../../../component/Form-controls/TextInput';
import ButtonComponent from '../../../../component/Task/ButtonComponent';
import { BlogContext } from '../../../../contexts/BlogContext';


const HeroWrapper = styled.div`
    margin: 75px auto;
    background-color: #EFF5FF;
    max-width: 1200px;
    height: 280px;
    border-radius: 5px;
    position: relative;

    .search-box {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    > svg {
        position: absolute;
        width: 35%;
        right: 20px;
        top: -65%;
    }
`;

const Form = styled.form`
    display: flex;
    margin-top: 30px;

    > * {
        margin: 0 10px;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }
    }
`;

const catOptions = [
    {
        value: 'Tech',
        label: 'Tech'
    },
    {
        value: 'Animes',
        label: 'Animes'
    },
    {
        value: 'Cartons',
        label: 'Cartons'
    },
    {
        value: 'Sports',
        label: 'Sports'
    },
]

const Hero = () => {

    const { dispatch } = useContext(BlogContext);
    const [textValue, setTextValue] = useState('');
    const [optionValue, setOptionValue] = useState('');

    useEffect(() => {
        AOS.init({ duration: 1500 });
        return () => AOS.refresh();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch({ type: 'SEARCH', payload: textValue });

        // alert(`Mencari postingan dengan kategori ${optionValue} dan keyword ${textValue}`);

        setTextValue('');
        setOptionValue('');
    }

    return (
        <HeroWrapper data-aos="fade-up">
            <div className="search-box">
                <Title text="Cari Postingan di Blog ini..." size="large" />
                <Form onSubmit={handleSubmit}>
                    <SelectInput 
                        options={catOptions} 
                        placeholder="Pilih Kategori" 
                        value={optionValue}
                        onChange={e => setOptionValue(e.target.value)}
                    />
                    <TextInput 
                        name="search" 
                        placeholder="Temukan Postingan" 
                        value={textValue}
                        onChange={e => setTextValue(e.target.value)}
                    />
                    <ButtonComponent text="Cari" type="primary" />
                </Form>
            </div>

            <HeroImage />
        </HeroWrapper>
    );
}
 
export default Hero;
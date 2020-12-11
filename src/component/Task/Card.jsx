import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';

// Helpers
import { HtmlToReactParser } from '../../helpers/HtmlToReact';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const CardWrapper = styled.div`
    max-width: 350px;
    min-width: 200px;
    min-height: 100%;
    background-color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .1);
    color: #A1A1A1;
    position: relative;
    top: 0;
    border-radius: 5px;
    overflow: hidden;
    transition: .4s ease-in;
    
    display: flex;
    flex-direction: column;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #2A65EA;
        clip-path: circle(0.0% at 100% 100%);
        transition: .7s ease-in-out;
    }

    .card__header {
        width: 100%;
        position: relative;
        z-index: 1;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            transition: .7s ease-in-out;
        }
    }

    .card__body {
        padding: 1rem;
        position: relative;
        z-index: 1;

        .titlex {
            font-family: 'HammersmithOne', sans-serif;
        }

        .content {
            font-size: 14px;
        }
    }

    &:hover {
        color: #fff;

        &:before {
            clip-path: circle(200% at 100% 100%);
        }

        .card__header {
            &:before {
            background-color: rgba(0, 0, 0, .1);
        }
        }
    }

`;

const Card = ({ contents }) => {
    
    const { title, content, blog_image } = contents;

    const handleContentText = (text, limit) => {
        let string = text.split(" ", limit).join(" ");

        return string + ' ...';
    }

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
        return () => AOS.refresh();
    }, []);
    
    return (
        <CardWrapper 
            data-aos="fade-in"
            data-aos-easing="ease-in-out"
        >
            <div className="card__header">
                <img src={`https://blog-api-jcdev.herokuapp.com/${blog_image}`} width="100%" alt="Gambar"/>
            </div>
            <div className="card__body">
                <p className="titlex">{ title }</p>
                <div className="content"><HtmlToReactParser content={handleContentText(entities.decode(content), 20)} /></div>
            </div>
        </CardWrapper>
    );
}
 
export default Card;
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Grid
import { Grid, _ } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

// Icons
import { ReactComponent as EyeIcon } from '../../../../assets/Icons/visibility_24px_outlined.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/Icons/delete_forever_24px_outlined.svg';

const Actions = styled.div`
    > svg{
        cursor: pointer;

        &:hover g path{
            fill: blue;
        }
    }    
`;

const CobaGrid = (props) => {
    const { data: nilai, handleDelete, handleShowDetail } = props;
    const [data, setData] = useState([]);
    const history = useHistory();

    console.log(nilai);
    console.log(data);

    const detail = (id) => {
        history.push('/post/addpost/');
    }

    useEffect(() => {
        console.log('useEffect CobaGrid');
        setData(
            nilai.map((d, i) => {
                let no = i+1;
                return [
                    no,
                    d.title,
                    _(
                        <Actions>
                            <EyeIcon onClick={() => handleShowDetail(d.id)} />
                            <DeleteIcon onClick={() => handleDelete(d.id)} />
                        </Actions>
                    )
                ];
            })
        );

        return () => {
            setData([]);
        }

    }, [nilai]);

    return (
        <Grid
            data={data}
            columns={['No.', 'Title', 'Actions']}
            search={{
                enabled: true,
                placeholder: 'Search...'
            }}
            sort={true}
            pagination={{
                enabled: true,
                limit: 10,
                summary: false
            }}
        />
    );
}

export default CobaGrid;
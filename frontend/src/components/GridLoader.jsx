import { Grid } from 'react-loader-spinner';

const GridLoader = () => {
    return (
        <div>
            <Grid
                height="80"
                width="80"
                color="#6c5ce7"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default GridLoader;
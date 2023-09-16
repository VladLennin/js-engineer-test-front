import React, {FC} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({children}) => {
    return (
        <>
            <Header/>
            <Main>
                {children}
            </Main>
            <Footer/>
        </>
    );
};

export default Wrapper;
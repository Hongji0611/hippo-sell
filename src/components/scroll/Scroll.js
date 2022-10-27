import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import "./Scroll.css";

function Scroll(props) {
    return (
        <div>
            <ScrollMenu separatorClassName='separator'>
                {props.list.map((item) => {
                        return (
                            <>
                                <div className='listItem'>
                                    {item}
                                </div>
                            </>
                        );
                    },
                )}
            </ScrollMenu>
        </div>

    );
};

export default Scroll;
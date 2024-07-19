import { Popup, Icon } from 'semantic-ui-react';

interface Props {
    content: any;
}

const Tooltip: React.FC<Props> = ({ content }) => {
    return (
        <Popup
            content={content}
            trigger={<Icon name="info circle" />}
            position='top center'
            style={{ fontSize: '10px' }}
        />
    );
};

export default Tooltip;

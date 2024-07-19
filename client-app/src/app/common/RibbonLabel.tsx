import { Label } from 'semantic-ui-react';

interface Props {
    content: string;
    
}

const RibbonLabel: React.FC<Props> = ({ content}) => {
    return (
        <Label ribbon color='teal' size='huge'>
            {content}
        </Label>
    );
};

export default RibbonLabel;
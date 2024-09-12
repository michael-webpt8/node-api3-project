import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

function User(props) {
    const { name } = props;
    return (
        <>
            <div>
                <Card>
                    <CardBody>
                        <Button outline color="primary">{name}</Button>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
export default User;
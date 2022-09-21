import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import LikeDataEntry from '../data-components/like-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';

/**
* Community view/edit section
*/
const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
return (
    <Fragment>
        <LikeDataEntry
            userLike={props.building_like}
            totalLikes={props.building.likes_total}
            mode={props.mode}
            onLike={props.onLike}
            />
        <p className="data-intro">{props.intro}</p>
        <ul className="data-list">
            <li>Is this a publicly owned building?</li>
            {
            // "slug": "community_publicly_owned",
            // "type": "checkbox"
            }
            <li>Has this building ever been used for community or public services activities?</li>
            {
            // "slug": "community_past_public",
            // "type": "checkbox"
            }
            <li>Would you describe this building as a community asset?</li>
            {
            // "slug": "community_asset",
            // "type": "checkbox"
            }
        </ul>
    </Fragment>
)
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;

import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { Link } from 'react-router-dom';
import InfoBox from '../../components/info-box';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';
import { buildingUserFields, dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import UserOpinionEntry from '../data-components/user-opinion-data-entry';

import DataEntry from '../data-components/data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import PlanningDataOfficialDataEntry from '../data-components/planning-data-entry';
import { CategoryViewProps } from './category-view-props';
import { Category } from '../../config/categories-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { processParam } from '../../../api/parameters';

const currentTimestamp = new Date().valueOf();
const milisecondsInYear = 1000 * 60 * 60 * 24 * 365;

// there is already "parseDate" in helpers
// but it is using timestamp as input, while this one
// uses lower accuracy (as actual data is using the same accuracy)
function parseDateSpecifiedWithDailyAccuracy(isoUtcDate: string): Date {
    const [year, month, day] = isoUtcDate.match(/^(\d{4})-(\d\d)-(\d\d)$/)
        .splice(1)
        .map(x => parseInt(x, 10));
    return new Date(Date.UTC(year, month-1, day));
}

function isArchived(item) {
    const decisionDate = item.decision_date;
    if(decisionDate != null) {
        if ((currentTimestamp - parseDateSpecifiedWithDailyAccuracy(decisionDate).valueOf()) > milisecondsInYear) {
            return true;
        }
    }
    if(item.registered_with_local_authority_date != null) {
        if ((currentTimestamp - parseDateSpecifiedWithDailyAccuracy(item.registered_with_local_authority_date).valueOf()) > milisecondsInYear) {
            return true;
        }
    }
    return false;
}

const PlanningView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToExpectedApplicationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('community_expected_planning_application_total')
    }
    const switchToBuildingProtectionMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_combined')
    }
    const switchToAllPlanningApplicationsMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_applications_status_all')
    }
    const { flood, floodSwitchOnClick, housing, housingSwitchOnClick, creative, creativeSwitchOnClick, vista, vistaSwitchOnClick, parcel, parcelSwitchOnClick, conservation, conservationSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    const communityLinkUrl = `/${props.mode}/${Category.Community}/${props.building.building_id}`;
    return (
    <Fragment>
        <DataEntryGroup name="Planning application information" collapsed={true} >
            <DataEntryGroup name="Current/active applications (official data)">
                <InfoBox>
                    This section provides data on active applications. We define these as applications with any activity in the last year.
                    <br />
                    To comment on an application follow the application link if provided, or visit the relevant local authority's planning page.
                </InfoBox>
                {props.building.planning_data ?
                    <PlanningDataOfficialDataEntry  
                        shownData={props.building.planning_data.filter(item => isArchived(item) == false)}
                        messageOnMissingData={
                            props.building.planning_data.length > 0 ?
                                "Only past application data is currently available for this site"
                                :
                                "No live planning data are currently available for this building."
                        }
                    />
                : <></>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Past applications (official data)" collapsed={true} >
                <InfoBox>
                    This section provides data on past applications where available from the DPE, including those with no decision in over a year
                </InfoBox>
                {props.building.planning_data ?
                    <PlanningDataOfficialDataEntry  
                        shownData={props.building.planning_data.filter(item => isArchived(item))}
                        messageOnMissingData={
                            props.building.planning_data.length > 0 ?
                                "Only current application data is currently available for this site"
                                :
                                "No live planning data are currently available for this building."
                        }
                    />
                : <></>
                }
            </DataEntryGroup>
            <DataEntryGroup name="Possible future applications (crowdsourced data)" collapsed={true} >
                <InfoBox type='info'>Click and colour buildings here if you think they may be subject to a future planning application involving demolition. To add your opinion on how well this building works, please also visit the <Link to={communityLinkUrl}>Community</Link> section.</InfoBox>
                {
                props.mapColourScale != "community_expected_planning_application_total" ?
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToExpectedApplicationMapStyle}>
                    {'Click here to view possible locations of future applications'}
                    </button>
                :
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAllPlanningApplicationsMapStyle}>
                    {'Click to see planning applications'}
                    </button>
                }
                <UserOpinionEntry
                    slug='community_expected_planning_application'
                    title={buildingUserFields.community_expected_planning_application.title}
                    userValue={props.building.community_expected_planning_application}

                    onChange={props.onSaveChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <InfoBox type='warning'>
                    Further improvements to this feature are currently being made.
                </InfoBox>
            </DataEntryGroup>
        </DataEntryGroup>
        <DataEntryGroup name="Forthcoming data (sections to be activated)" collapsed={true} >        
        <DataEntryGroup name="Active application info (crowdsourced)" collapsed={true} >
                {/* will be titled "Other active application info (crowdsourced data)" once active" */}
                <InfoBox type='warning'>
                    This category is not yet activated -  Until this section is activated please report inaccuracies or problems on the <a href=" https://github.com/colouring-cities/colouring-london/discussions/categories/planning-section-comments">Discussion Forum</a>.
                </InfoBox>
                {/* that is placeholder display, will be replaced by actual code */}
                <div className="data-title">
                    <div className="data-title-text">
                        <ul>
                            <li>Year of completion if known</li>
                            <li>If you know of a planning application that has been recently submitted for this site, and is not listed in the blue box above, please enter its planning application ID below:</li>
                            <li>If any of the active planning applications are not mapped onto the correct site, please tick here</li>
                        </ul>
                    </div>
                </div>
                {
                    /*
                <NumericDataEntry
                    title={dataFields.planning_crowdsourced_site_completion_year.title}
                    slug="planning_crowdsourced_site_completion_year"
                    value={props.building.planning_crowdsourced_site_completion_year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    disabled={true}
                    />
                <Verification
                    slug="planning_crowdsourced_site_completion_year"
                    allow_verify={false}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_crowdsourced_site_completion_year")}
                    user_verified_as={props.user_verified.planning_crowdsourced_site_completion_year}
                    verified_count={props.building.verified.planning_crowdsourced_site_completion_year}
                    />

                <DataEntry
                    title={dataFields.planning_crowdsourced_planning_id.title}
                    slug="planning_crowdsourced_planning_id"
                    value={props.building.planning_crowdsourced_planning_id}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    disabled={true}
                 />
                <Verification
                    slug="planning_crowdsourced_planning_id"
                    allow_verify={false && props.user !== undefined && props.building.planning_crowdsourced_planning_id !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_crowdsourced_planning_id")}
                    user_verified_as={props.user_verified.planning_crowdsourced_planning_id}
                    verified_count={props.building.verified.planning_crowdsourced_planning_id}
                    />

                <LogicalDataEntry
                    slug='community_expected_planning_application_is_inaccurate'
                    title={"If any of the active planning applications are not mapped onto the correct site, please tick here"}
                    value={null}

                    onChange={props.onSaveChange}
                    mode={props.mode}
                    copy={props.copy}
                    disabled={true}
                />
                on enabling switch it to UserOpinionEntry, remove value and restore userValue
                */
                }

            </DataEntryGroup>
            <DataEntryGroup name="Land ownership type" collapsed={true} >
                    <InfoBox type='warning'>
                        This category is not yet activated.
                    </InfoBox>
                    <InfoBox>
                        This section is designed to provide information on land parcels and their ownership type. Can you help us to crowdsource this information?
                    </InfoBox>
                    <button className={`map-switcher-inline ${parcel}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={parcelSwitchOnClick}>
                    {(parcel === 'enabled')? 'Click to hide sample of parcel data (in City)' : 'Click to see sample of parcel data (in City) mapped'}
                    </button>
                    <div className="data-title">
                        <div className="data-title-text">
                            <ul>
                                <li>What type of owner owns this land parcel?</li>
                            </ul>
                        </div>
                    </div>

                    {/*
                    <SelectDataEntry
                        slug='community_public_ownership'
                        title={"What type of owner owns this land parcel? "}
                        value={props.building.community_public_ownership}
                        options={[
                            'Government-owned',
                            'Charity-owned',
                            'Community-owned/cooperative',
                            'Owned by other non-profit body',
                            'Not in public/community ownership',
                        ]}

                        onChange={props.onChange}
                        mode={props.mode}
                        copy={props.copy}
                    />
                    <Verification
                        slug="community_public_ownership"
                        allow_verify={props.user !== undefined && props.building.community_public_ownership !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("community_public_ownership")}
                        user_verified_as={props.user_verified.community_public_ownership}
                        verified_count={props.building.verified.community_public_ownership}
                    />
                    */
                    }
            </DataEntryGroup>
        </DataEntryGroup>
    </Fragment>
)};
const PlanningContainer = withCopyEdit(PlanningView);

export default PlanningContainer;

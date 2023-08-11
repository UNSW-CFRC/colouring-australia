/**
 * This file defines all the valid tileset names that can be obtained from the tilserver.
 * Adjust the values here if modifying the list of styles in the tileserver.
 */

export type BuildingMapTileset = 
    'date_year' | 
    'size_height' |
    'size_storeys' |
    'size_footprint' |
    'size_plot' |
    'construction_core_material' |
    'location' |
    'ext_walk_index' |
    'ext_walk_employment' |
    'ext_walk_education' |
    'ext_walk_shopping' |
    'ext_walk_errands' |
    'ext_walk_recreation' |
    'is_domestic' |
    'likes' |
    'typology_likes' |
    'community_local_significance_total' |
    'community_expected_planning_application_total' |
    'community_in_public_ownership' |
    'planning_applications_status_all' |
    'planning_applications_status_recent' |
    'planning_applications_status_very_recent' |
    'planning_combined' |
    'ext_nabers_energy_rating' |
    'ext_nabers_water_rating' |
    'ext_nabers_indoor_rating' |
    'ext_nabers_waste_rating' |
    'ext_rental_affordability' |
    'ext_in_heritage' |
    'sust_dec' |
    'building_attachment_form' |
    'landuse' |
    'dynamics_demolished_count' |
    'disaster_severity' |
    'team' |
    'survival_status';

export type SpecialMapTileset = 'base_light' | 'base_night' | 'base_night_outlines' | 'highlight' | 'number_labels' | 'base_boroughs';

export type MapTileset = BuildingMapTileset | SpecialMapTileset;

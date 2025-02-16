import { Category } from './categories-config';
import { BuildingMapTileset } from './tileserver-config';

export type LegendElement = {
    color: string;
    border?: string;
    text: string;
} | {
    subtitle: string;
};

export interface LegendConfig {
    title: string;
    description?: string;
    disclaimer?: string;
    elements: LegendElement[];
}

export interface CategoryMapDefinition {
    mapStyle: BuildingMapTileset;
    legend: LegendConfig;
}

export const defaultMapCategory = Category.Age;

export const categoryMapsConfig: {[key in Category]: CategoryMapDefinition} = {
    [Category.Age]: {
        mapStyle: 'date_year',
        legend: {
            title: 'Age',
            elements: [
                { color: '#fff9b8', text: '>2020' },
                { color: '#fae269', text: '2000-2019' },
                { color: '#fbaf27', text: '1980-1999' },
                { color: '#e6711d', text: '1960-1979' },
                { color: '#cc1212', text: '1940-1959' },
                { color: '#8f0303', text: '1920-1939' },
                { color: '#8f5385', text: '1900-1919' },
                { color: '#c3e1eb', text: '1880-1899' },
                { color: '#6a9dba', text: '1860-1879' },
                { color: '#3b74a3', text: '1840-1859' },
                { color: '#95ded8', text: '1820-1839' },
                { color: '#68aba5', text: '1800-1819' },
                { color: '#acc98f', text: '1750-1799' },
                { color: '#6d8a51', text: '1700-1749' },
                { color: '#d0c291', text: '<1700' },
            ]
        },
    },
    [Category.Size]: {
        mapStyle: 'size_height',
        legend: {
            title: 'Height to apex',
            elements: [
                { color: '#f7f4f9', text: '0-5.55'},
                { color: '#e7e1ef', text: '5.55-7.73'},
                { color: '#d4b9da', text: '7.73-11.38'},
                { color: '#c994c7', text: '11.38-18.45'},
                { color: '#df65b0', text: '18.45-35.05'},
                { color: '#e7298a', text: '35.05-89.30'},
                { color: '#ce1256', text: '89.30-152'},
                { color: '#980043', text: '≥152'}
            ]
        },
    },
    [Category.Team]: {
        mapStyle: undefined,
        legend: {
            title: 'Team',
            elements: []
        },
    },
    [Category.Construction]: {
        mapStyle: 'construction_core_material',
        legend: {
            title: 'Construction',
            elements: [
                { color: "#96613b", text: "Wood" },
                { color: "#ffffe3", text: "Stone" },
                { color: "#f5d96b", text: "Brick" },
                { color: "#beffe8", text: "Steel" },
                { color: "#fca89d", text: "Reinforced Concrete" },
                { color: "#5c8970", text: "Other Metal" },
                { color: "#b5a859", text: "Other Natural Material" },
                { color: "#c48a85", text: "Other Man-Made Material" }
            ]
        },
    },
    [Category.Location]: {
        mapStyle: 'location',
        legend: {
            title: 'Location',
            description: '% data collected',
            elements: [
                { color: '#084081', text: '≥80%' },
                { color: '#0868ac', text: '60–80%' },
                { color: '#43a2ca', text: '40–60%' },
                { color: '#7bccc4', text: '20–40%' },
                { color: '#bae4bc', text: '<20%' }
            ]
        },
    },
    [Category.Community]: {
        mapStyle: 'comm_walk_index',
        legend: {
            title: 'Like Me',
            elements: [
                { color: '#fff9b8', text: '>95' },
                { color: '#fae269', text: '90-95' },
                { color: '#fbaf27', text: '85-90' },
                { color: '#e6711d', text: '80-85' },
                { color: '#cc1212', text: '75-80' },
                { color: '#8f0303', text: '70-75' },
                { color: '#8f5385', text: '65-70' },
                { color: '#c3e1eb', text: '60-65' },
                { color: '#6a9dba', text: '55-60' },
                { color: '#3b74a3', text: '50-55' },
                { color: '#95ded8', text: '45-50' },
                { color: '#68aba5', text: '40-45' },
                { color: '#acc98f', text: '35-40' },
                { color: '#6d8a51', text: '30-35' },
                { color: '#d0c291', text: '<30' },
            ]
        }
    },
    [Category.Planning]: {
        mapStyle: 'planning_combined',
        legend: {
            title: 'Statutory protections',
            disclaimer: 'All data relating to designated buildings should be checked on the National Heritage List for England or local authority websites where used for planning or development purposes',
            elements: [
                { color: '#95beba', text: 'In conservation area'},
                { color: '#c72e08', text: 'Grade I listed'},
                { color: '#e75b42', text: 'Grade II* listed'},
                { color: '#ffbea1', text: 'Grade II listed'},
                { color: '#858ed4', text: 'Locally listed'},
            ]
        },
    },
    [Category.Sustainability]: {
        mapStyle: 'sust_nabers_energy_rating',
        legend: {
            title: 'Sustainability',
            description: 'NABERS Energy Rating',
            elements: [
                { color: "#ff0000", text: '0 Star' },
                { color: "#e92b00", text: '1 Star' },
                { color: "#d35500", text: '2 Star' },
                { color: "#bd8000", text: '3 Star' },
                { color: "#a6aa00", text: '4 Star' },
                { color: "#90d500", text: '5 Star' },
                { color: "#7aff00", text: '6 Star' },
            ]
        },
    },
    [Category.Type]: {
        mapStyle: 'building_attachment_form',
        legend: {
            title: 'Type',
            elements: [
                { color: "#f2a2b9", text: "Detached" },
                { color: "#ab8fb0", text: "Semi-Detached" },
                { color: "#3891d1", text: "End-Terrace" },
                { color: "#226291", text: "Mid-Terrace" }
            ]
        },
    },
    [Category.LandUse]: {
        mapStyle: 'landuse',
        legend: {
            title: 'Land Use',
            elements: [
                { color: '#e5050d', text: 'Mixed Use' },
                { subtitle: 'Single use:'},
                { color: '#4a54a6', text: 'Residential' },
                { color: '#ff8c00', text: 'Retail' },
                { color: '#f5f58f', text: 'Industry & Business' },
                { color: '#73ccd1', text: 'Community Services' },
                { color: '#ffbfbf', text: 'Recreation & Leisure' },
                { color: '#b3de69', text: 'Transport' },
                { color: '#cccccc', text: 'Utilities & Infrastructure' },
                { color: '#898944', text: 'Defence' },
                { color: '#fa667d', text: 'Agriculture' },
                { color: '#53f5dd', text: 'Minerals' },
                { color: '#ffffff', text: 'Vacant & Derelict' }
            ]
        },
    },
    [Category.Streetscape]: {
        mapStyle: undefined,
        legend: {
            title: 'Streetscape',
            elements: []
        },
    },
    [Category.Dynamics]: {
        mapStyle: 'dynamics_demolished_count',
        legend: {
            title: 'Dynamics',
            description: 'Demolished buildings on the same site',
            elements: [
                {
                    text: '7+',
                    color: '#bd0026',
                }, {
                    text: '6',
                    color: '#e31a1c',
                }, {
                    text: '5',
                    color: '#fc4e2a',
                }, {
                    text: '4',
                    color: '#fd8d3c',
                }, {
                    text: '3',
                    color: '#feb24c',
                }, {
                    text: '2',
                    color: '#fed976',
                }, {
                    text: '1',
                    color: '#ffe8a9',
                }, {
                    text: 'None',
                    color: '#0C7BDC'
                }
            ],
        },
    }
   /* ,
    [Category.Test]: {
        mapStyle: 'landuse',
        legend: {
            title: 'Test',
            elements: [
                { color: '#e5050d', text: 'Mixed Use' },
                { subtitle: 'Single use:'},
                { color: '#4a54a6', text: 'Residential' },
                { color: '#ff8c00', text: 'Retail' },
                { color: '#f5f58f', text: 'Industry & Business' },
                { color: '#73ccd1', text: 'Community Services' },
                { color: '#ffbfbf', text: 'Recreation & Leisure' },
                { color: '#b3de69', text: 'Transport' },
                { color: '#cccccc', text: 'Utilities & Infrastructure' },
                { color: '#898944', text: 'Defence' },
                { color: '#fa667d', text: 'Agriculture' },
                { color: '#53f5dd', text: 'Minerals' },
                { color: '#ffffff', text: 'Vacant & Derelict' }
            ]
        },
    }*/
    
};

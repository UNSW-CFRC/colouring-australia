-- NABERS energy ratings

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_nabers_energy_rating text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_nabers_water_rating text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_nabers_indoor_rating text;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_nabers_waste_rating text;

-- Walkability data

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_index real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_employment real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_education real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_shopping real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_errands real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_walk_recreation real;

-- Construction

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_building_quality text;

-- Sustainability

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_electricity real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_solarpanels real;

-- Street Context

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_num_trees_within_100 real;

-- Land Use

ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_avg_bld_density real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_avg_bld_distance real;
ALTER TABLE buildings ADD COLUMN IF NOT EXISTS ext_ownership text;

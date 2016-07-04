SELECT
  id, name, 'Irish' as itemtype
FROM
  companies
WHERE
  deleted_at IS NULL AND is_live = true
UNION
SELECT
  id, name, 'International' as itemtype
FROM
  multinationals
WHERE
  deleted_at IS NULL AND is_live = true
UNION
SELECT
  id, name, 'Investors' as itemtype
FROM
  investors
WHERE
  deleted_at IS NULL AND is_live = true
UNION
SELECT
  id, name, 'Hubs' as itemtype
FROM
  hubs
WHERE
  deleted_at IS NULL AND is_live = true
ORDER BY
  name

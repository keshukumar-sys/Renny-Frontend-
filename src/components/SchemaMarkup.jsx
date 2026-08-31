import { Helmet } from 'react-helmet-async';

export default function SchemaMarkup({ schema }) {
  if (!schema) {
    console.warn('⚠️ No schema provided to SchemaMarkup component');
    return null;
  }

  const schemas = Array.isArray(schema) ? schema : [schema];

  // Validate schemas
  function validateSchema(schema, prefix = 'Schema') {
    if (!schema['@context']) {
      console.warn(`${prefix} missing @context`);
    }

    if (schema['@graph']) {
      schema['@graph'].forEach((item, i) =>
        validateSchema(item, `${prefix} -> graph[${i}]`)
      );
      return;
    }

    if (!schema['@type']) {
      console.warn(`${prefix} missing @type`, schema);
    }
  }
  schemas.forEach((schema, i) => validateSchema(schema, `Schema ${i}`));
  console.log(
    `✅ SchemaMarkup rendering ${schemas.length} schema(s) for:`,
    window.location.pathname
  );

  return (
    <Helmet>
      <script type="application/ld+json" id="blog-schema">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}

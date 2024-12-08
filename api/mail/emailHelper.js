/**
 * Replaces placeholders in an email template with provided values.
 * @param {string} template - The email template containing placeholders in `{key}` format.
 * @param {Object} replacements - Key-value pairs where the key matches the placeholder, and the value is the replacement.
 * @returns {string} - The email template with placeholders replaced.
 */
const applyTemplateReplacements = (template, replacements) => {
    return Object.entries(replacements).reduce(
        (updatedTemplate, [key, value]) =>
            updatedTemplate.replace(new RegExp(`{${key}}`, "g"), value),
        template
    );
};

export { applyTemplateReplacements };
tar -cC ~/ikol/ikol-webapp/client/packages/ui-kit/ \
    --exclude='node_modules' \
    --exclude='package-lock.json' \
    --exclude='docs/dist' \
    --exclude='dist' \
    --exclude='coverage' \
    --exclude='lib' . | tar -xC ./packages/ui-kit/

tar -cC ~/ikol/ikol-webapp/client/packages/eslint-config-ts-vue3/ \
    --exclude='node_modules' \
    --exclude='package-lock.json' \
    --exclude='docs/dist' \
    --exclude='dist' \
    --exclude='coverage' \
    --exclude='lib' . | tar -xC ./packages/eslint-config-ts-vue3/

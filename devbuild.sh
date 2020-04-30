#build for dev:
rm ./src/environments/custom.ts
sed "s/=/ = '/g" .env > ./src/environments/custom.ts
sed -i "s/.*/export const &';/" ./src/environments/custom.ts
npx ionic serve --no-open

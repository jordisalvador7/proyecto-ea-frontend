#build for production:
rm ./src/environments/custom.ts
echo "export const API_URL = 'http://runnea.tk:8080';" >> ./src/environments/custom.ts
npx ionic build --prod

# installation process

__npm init__

__npm i express cors mongoose morgan dotenv__

__yarn add -D express typescript ts-node nodemon @types/node @types/express ts-node-dev__

__npx tsc --init__


# Modifying package.json 

```
    "scripts": {
		"build": "tsc",
		"dev": "ts-node-dev src/index.ts"
	}
```
    ### ts-node: equivalent with node file.js when compiling with file.ts
    ### ts-node-dev: equivalent with nodemon --exec ts-node file.ts

# Modifying tsconfig.json

```
    {
     "target": "es6",                                
     "outDir": "./dist",                              
     "rootDir": "./src",  
    } 

```
 
("use strict");

// Object.defineProperty(exports, "__esModule", { value: true });

var React = require("react");
var PropTypes = require("prop-types");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/ _interopDefaultLegacy(PropTypes);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/*eslint-disable*/
var libpannellum = (function (window, document, undefined$1) {
  if (!window || !document) return;

  function Renderer(container) {
    var canvas = document.createElement("canvas");
    canvas.style.width = canvas.style.height = "100%";
    container.appendChild(canvas);
    var program, gl, vs, fs;
    var fallbackImgSize;
    var world;
    var vtmps;
    var pose;
    var image, imageType, dynamic;
    var texCoordBuffer, cubeVertBuf, cubeVertTexCoordBuf, cubeVertIndBuf;
    var globalParams;
    /**
     * Initialize renderer.
     * @memberof Renderer
     * @instance
     * @param {Image|Array|Object} image - Input image; format varies based on
     *      `imageType`. For `equirectangular`, this is an image; for
     *      `cubemap`, this is an array of images for the cube faces in the
     *      order [+z, +x, -z, -x, +y, -y]; for `multires`, this is a
     *      configuration object.
     * @param {string} imageType - The type of the image: `equirectangular`,
     *      `cubemap`, or `multires`.
     * @param {boolean} dynamic - Whether or not the image is dynamic (e.g. video).
     * @param {number} haov - Initial horizontal angle of view.
     * @param {number} vaov - Initial vertical angle of view.
     * @param {number} voffset - Initial vertical offset angle.
     * @param {function} callback - Load callback function.
     * @param {Object} [params] - Other configuration parameters (`horizonPitch`, `horizonRoll`, `backgroundColor`).
     */

    this.init = function (
      _image,
      _imageType,
      _dynamic,
      haov,
      vaov,
      voffset,
      callback,
      params
    ) {
      // Default argument for image type
      if (_imageType === undefined$1) _imageType = "equirectangular";

      if (
        _imageType != "equirectangular" &&
        _imageType != "cubemap" &&
        _imageType != "multires"
      ) {
        console.log("Error: invalid image type specified!");
        throw {
          type: "config error",
        };
      }

      imageType = _imageType;
      image = _image;
      dynamic = _dynamic;
      globalParams = params || {}; // Clear old data

      if (program) {
        if (vs) {
          gl.detachShader(program, vs);
          gl.deleteShader(vs);
        }

        if (fs) {
          gl.detachShader(program, fs);
          gl.deleteShader(fs);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        if (program.texture) gl.deleteTexture(program.texture);
        if (program.nodeCache)
          for (var i = 0; i < program.nodeCache.length; i++) {
            gl.deleteTexture(program.nodeCache[i].texture);
          }
        gl.deleteProgram(program);
        program = undefined$1;
      }

      pose = undefined$1;
      var s;
      var faceMissing = false;
      var cubeImgWidth;

      if (imageType == "cubemap") {
        for (s = 0; s < 6; s++) {
          if (image[s].width > 0) {
            if (cubeImgWidth === undefined$1) cubeImgWidth = image[s].width;
            if (cubeImgWidth != image[s].width)
              console.log(
                "Cube faces have inconsistent widths: " +
                  cubeImgWidth +
                  " vs. " +
                  image[s].width
              );
          } else faceMissing = true;
        }
      }

      function fillMissingFaces(imgSize) {
        if (faceMissing) {
          // Fill any missing fallback/cubemap faces with background
          var nbytes = imgSize * imgSize * 4; // RGB, plus non-functional alpha

          var imageArray = new Uint8ClampedArray(nbytes);
          var rgb = params.backgroundColor ? params.backgroundColor : [0, 0, 0];
          rgb[0] *= 255;
          rgb[1] *= 255;
          rgb[2] *= 255; // Maybe filling could be done faster, see e.g. https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array

          for (var i = 0; i < nbytes; i++) {
            imageArray[i++] = rgb[0];
            imageArray[i++] = rgb[1];
            imageArray[i++] = rgb[2];
          }

          var backgroundSquare = new ImageData(imageArray, imgSize, imgSize);

          for (s = 0; s < 6; s++) {
            if (image[s].width == 0) image[s] = backgroundSquare;
          }
        }
      } // This awful browser specific test exists because iOS 8/9 and IE 11
      // don't display non-power-of-two cubemap textures but also don't
      // throw an error (tested on an iPhone 5c / iOS 8.1.3 / iOS 9.2 /
      // iOS 10.3.1).
      // Therefore, the WebGL context is never created for these browsers for
      // NPOT cubemaps, and the CSS 3D transform fallback renderer is used
      // instead.

      if (
        !(
          imageType == "cubemap" &&
          (cubeImgWidth & (cubeImgWidth - 1)) !== 0 &&
          (navigator.userAgent
            .toLowerCase()
            .match(/(iphone|ipod|ipad).* os 8_/) ||
            navigator.userAgent
              .toLowerCase()
              .match(/(iphone|ipod|ipad).* os 9_/) ||
            navigator.userAgent
              .toLowerCase()
              .match(/(iphone|ipod|ipad).* os 10_/) ||
            navigator.userAgent.match(/Trident.*rv[ :]*11\./))
        )
      ) {
        // Enable WebGL on canvas
        if (!gl)
          gl = canvas.getContext("experimental-webgl", {
            alpha: false,
            depth: false,
          });
        if (gl && gl.getError() == 1286) handleWebGLError1286();
      } // If there is no WebGL, fall back to CSS 3D transform renderer.
      // This will discard the image loaded so far and load the fallback image.
      // While browser specific tests are usually frowned upon, the
      // fallback viewer only really works with WebKit/Blink and IE 10/11
      // (it doesn't work properly in Firefox).

      if (
        !gl &&
        ((imageType == "multires" && image.hasOwnProperty("fallbackPath")) ||
          imageType == "cubemap") &&
        ("WebkitAppearance" in document.documentElement.style ||
          navigator.userAgent.match(/Trident.*rv[ :]*11\./) ||
          navigator.appVersion.indexOf("MSIE 10") !== -1)
      ) {
        // Remove old world if it exists
        if (world) {
          container.removeChild(world);
        } // Initialize renderer

        world = document.createElement("div");
        world.className = "pnlm-world"; // Add images

        var path;

        if (image.basePath) {
          path = image.basePath + image.fallbackPath;
        } else {
          path = image.fallbackPath;
        }

        var sides = ["f", "r", "b", "l", "u", "d"];
        var loaded = 0;

        var onLoad = function onLoad() {
          // Draw image on canvas
          var faceCanvas = document.createElement("canvas");
          faceCanvas.className = "pnlm-face pnlm-" + sides[this.side] + "face";
          world.appendChild(faceCanvas);
          var faceContext = faceCanvas.getContext("2d");
          faceCanvas.style.width = this.width + 4 + "px";
          faceCanvas.style.height = this.height + 4 + "px";
          faceCanvas.width = this.width + 4;
          faceCanvas.height = this.height + 4;
          faceContext.drawImage(this, 2, 2);
          var imgData = faceContext.getImageData(
            0,
            0,
            faceCanvas.width,
            faceCanvas.height
          );
          var data = imgData.data; // Duplicate edge pixels

          var i;
          var j;

          for (i = 2; i < faceCanvas.width - 2; i++) {
            for (j = 0; j < 4; j++) {
              data[(i + faceCanvas.width) * 4 + j] =
                data[(i + faceCanvas.width * 2) * 4 + j];
              data[(i + faceCanvas.width * (faceCanvas.height - 2)) * 4 + j] =
                data[(i + faceCanvas.width * (faceCanvas.height - 3)) * 4 + j];
            }
          }

          for (i = 2; i < faceCanvas.height - 2; i++) {
            for (j = 0; j < 4; j++) {
              data[(i * faceCanvas.width + 1) * 4 + j] =
                data[(i * faceCanvas.width + 2) * 4 + j];
              data[((i + 1) * faceCanvas.width - 2) * 4 + j] =
                data[((i + 1) * faceCanvas.width - 3) * 4 + j];
            }
          }

          for (j = 0; j < 4; j++) {
            data[(faceCanvas.width + 1) * 4 + j] =
              data[(faceCanvas.width * 2 + 2) * 4 + j];
            data[(faceCanvas.width * 2 - 2) * 4 + j] =
              data[(faceCanvas.width * 3 - 3) * 4 + j];
            data[(faceCanvas.width * (faceCanvas.height - 2) + 1) * 4 + j] =
              data[(faceCanvas.width * (faceCanvas.height - 3) + 2) * 4 + j];
            data[(faceCanvas.width * (faceCanvas.height - 1) - 2) * 4 + j] =
              data[(faceCanvas.width * (faceCanvas.height - 2) - 3) * 4 + j];
          }

          for (i = 1; i < faceCanvas.width - 1; i++) {
            for (j = 0; j < 4; j++) {
              data[i * 4 + j] = data[(i + faceCanvas.width) * 4 + j];
              data[(i + faceCanvas.width * (faceCanvas.height - 1)) * 4 + j] =
                data[(i + faceCanvas.width * (faceCanvas.height - 2)) * 4 + j];
            }
          }

          for (i = 1; i < faceCanvas.height - 1; i++) {
            for (j = 0; j < 4; j++) {
              data[i * faceCanvas.width * 4 + j] =
                data[(i * faceCanvas.width + 1) * 4 + j];
              data[((i + 1) * faceCanvas.width - 1) * 4 + j] =
                data[((i + 1) * faceCanvas.width - 2) * 4 + j];
            }
          }

          for (j = 0; j < 4; j++) {
            data[j] = data[(faceCanvas.width + 1) * 4 + j];
            data[(faceCanvas.width - 1) * 4 + j] =
              data[(faceCanvas.width * 2 - 2) * 4 + j];
            data[faceCanvas.width * (faceCanvas.height - 1) * 4 + j] =
              data[(faceCanvas.width * (faceCanvas.height - 2) + 1) * 4 + j];
            data[(faceCanvas.width * faceCanvas.height - 1) * 4 + j] =
              data[(faceCanvas.width * (faceCanvas.height - 1) - 2) * 4 + j];
          } // Draw image width duplicated edge pixels on canvas

          faceContext.putImageData(imgData, 0, 0);
          incLoaded.call(this);
        };

        var incLoaded = function incLoaded() {
          if (this.width > 0) {
            if (fallbackImgSize === undefined$1) fallbackImgSize = this.width;
            if (fallbackImgSize != this.width)
              console.log(
                "Fallback faces have inconsistent widths: " +
                  fallbackImgSize +
                  " vs. " +
                  this.width
              );
          } else faceMissing = true;

          loaded++;

          if (loaded == 6) {
            fallbackImgSize = this.width;
            container.appendChild(world);
            callback();
          }
        };

        faceMissing = false;

        for (s = 0; s < 6; s++) {
          var faceImg = new Image();
          faceImg.crossOrigin = globalParams.crossOrigin
            ? globalParams.crossOrigin
            : "anonymous";
          faceImg.side = s;
          faceImg.onload = onLoad;
          faceImg.onerror = incLoaded; // ignore missing face to support partial fallback image

          if (imageType == "multires") {
            faceImg.src = path.replace("%s", sides[s]) + "." + image.extension;
          } else {
            faceImg.src = image[s].src;
          }
        }

        fillMissingFaces(fallbackImgSize);
        return;
      } else if (!gl) {
        console.log("Error: no WebGL support detected!");
        throw {
          type: "no webgl",
        };
      }

      if (imageType == "cubemap") fillMissingFaces(cubeImgWidth);

      if (image.basePath) {
        image.fullpath = image.basePath + image.path;
      } else {
        image.fullpath = image.path;
      }

      image.invTileResolution = 1 / image.tileResolution;
      var vertices = createCube();
      vtmps = [];

      for (s = 0; s < 6; s++) {
        vtmps[s] = vertices.slice(s * 12, s * 12 + 12);
        vertices = createCube();
      } // Make sure image isn't too big

      var maxWidth = 0;

      if (imageType == "equirectangular") {
        maxWidth = gl.getParameter(gl.MAX_TEXTURE_SIZE);

        if (Math.max(image.width / 2, image.height) > maxWidth) {
          console.log(
            "Error: The image is too big; it's " +
              image.width +
              "px wide, " +
              "but this device's maximum supported size is " +
              maxWidth * 2 +
              "px."
          );
          throw {
            type: "webgl size error",
            width: image.width,
            maxWidth: maxWidth * 2,
          };
        }
      } else if (imageType == "cubemap") {
        if (cubeImgWidth > gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE)) {
          console.log(
            "Error: The image is too big; it's " +
              cubeImgWidth +
              "px wide, " +
              "but this device's maximum supported size is " +
              maxWidth +
              "px."
          );
          throw {
            type: "webgl size error",
            width: cubeImgWidth,
            maxWidth: maxWidth,
          };
        }
      } // Store horizon pitch and roll if applicable

      if (
        params !== undefined$1 &&
        (params.horizonPitch !== undefined$1 ||
          params.horizonRoll !== undefined$1)
      )
        pose = [
          params.horizonPitch == undefined$1 ? 0 : params.horizonPitch,
          params.horizonRoll == undefined$1 ? 0 : params.horizonRoll,
        ]; // Set 2d texture binding

      var glBindType = gl.TEXTURE_2D; // Create viewport for entire canvas

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); // Check precision support

      if (gl.getShaderPrecisionFormat) {
        var precision = gl.getShaderPrecisionFormat(
          gl.FRAGMENT_SHADER,
          gl.HIGH_FLOAT
        );

        if (precision && precision.precision < 1) {
          // `highp` precision not supported; https://stackoverflow.com/a/33308927
          fragEquiCubeBase = fragEquiCubeBase.replace("highp", "mediump");
        }
      } // Create vertex shader

      vs = gl.createShader(gl.VERTEX_SHADER);
      var vertexSrc = v;

      if (imageType == "multires") {
        vertexSrc = vMulti;
      }

      gl.shaderSource(vs, vertexSrc);
      gl.compileShader(vs); // Create fragment shader

      fs = gl.createShader(gl.FRAGMENT_SHADER);
      var fragmentSrc = fragEquirectangular;

      if (imageType == "cubemap") {
        glBindType = gl.TEXTURE_CUBE_MAP;
        fragmentSrc = fragCube;
      } else if (imageType == "multires") {
        fragmentSrc = fragMulti;
      }

      gl.shaderSource(fs, fragmentSrc);
      gl.compileShader(fs); // Link WebGL program

      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program); // Log errors

      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
        console.log(gl.getShaderInfoLog(vs));
      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
        console.log(gl.getShaderInfoLog(fs));
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.log(gl.getProgramInfoLog(program)); // Use WebGL program

      gl.useProgram(program);
      program.drawInProgress = false; // Set background clear color (does not apply to cubemap/fallback image)

      var color = params.backgroundColor ? params.backgroundColor : [0, 0, 0];
      gl.clearColor(color[0], color[1], color[2], 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT); // Look up texture coordinates location

      program.texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(program.texCoordLocation);

      if (imageType != "multires") {
        // Provide texture coordinates for rectangle
        if (!texCoordBuffer) texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]),
          gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(
          program.texCoordLocation,
          2,
          gl.FLOAT,
          false,
          0,
          0
        ); // Pass aspect ratio

        program.aspectRatio = gl.getUniformLocation(program, "u_aspectRatio");
        gl.uniform1f(
          program.aspectRatio,
          gl.drawingBufferWidth / gl.drawingBufferHeight
        ); // Locate psi, theta, focal length, horizontal extent, vertical extent, and vertical offset

        program.psi = gl.getUniformLocation(program, "u_psi");
        program.theta = gl.getUniformLocation(program, "u_theta");
        program.f = gl.getUniformLocation(program, "u_f");
        program.h = gl.getUniformLocation(program, "u_h");
        program.v = gl.getUniformLocation(program, "u_v");
        program.vo = gl.getUniformLocation(program, "u_vo");
        program.rot = gl.getUniformLocation(program, "u_rot"); // Pass horizontal extent, vertical extent, and vertical offset

        gl.uniform1f(program.h, haov / (Math.PI * 2.0));
        gl.uniform1f(program.v, vaov / Math.PI);
        gl.uniform1f(program.vo, (voffset / Math.PI) * 2); // Set background color

        if (imageType == "equirectangular") {
          program.backgroundColor = gl.getUniformLocation(
            program,
            "u_backgroundColor"
          );
          gl.uniform4fv(program.backgroundColor, color.concat([1]));
        } // Create texture

        program.texture = gl.createTexture();
        gl.bindTexture(glBindType, program.texture); // Upload images to texture depending on type

        if (imageType == "cubemap") {
          // Load all six sides of the cube map
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[1]
          );
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[3]
          );
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[4]
          );
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[5]
          );
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[0]
          );
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            0,
            gl.RGB,
            gl.RGB,
            gl.UNSIGNED_BYTE,
            image[2]
          );
        } else {
          if (image.width <= maxWidth) {
            gl.uniform1i(gl.getUniformLocation(program, "u_splitImage"), 0); // Upload image to the texture

            gl.texImage2D(
              glBindType,
              0,
              gl.RGB,
              gl.RGB,
              gl.UNSIGNED_BYTE,
              image
            );
          } else {
            // Image needs to be split into two parts due to texture size limits
            gl.uniform1i(gl.getUniformLocation(program, "u_splitImage"), 1); // Draw image on canvas

            var cropCanvas = document.createElement("canvas");
            cropCanvas.width = image.width / 2;
            cropCanvas.height = image.height;
            var cropContext = cropCanvas.getContext("2d");
            cropContext.drawImage(image, 0, 0); // Upload first half of image to the texture

            var cropImage = cropContext.getImageData(
              0,
              0,
              image.width / 2,
              image.height
            );
            gl.texImage2D(
              glBindType,
              0,
              gl.RGB,
              gl.RGB,
              gl.UNSIGNED_BYTE,
              cropImage
            ); // Create and bind texture for second half of image

            program.texture2 = gl.createTexture();
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(glBindType, program.texture2);
            gl.uniform1i(gl.getUniformLocation(program, "u_image1"), 1); // Upload second half of image to the texture

            cropContext.drawImage(image, -image.width / 2, 0);
            cropImage = cropContext.getImageData(
              0,
              0,
              image.width / 2,
              image.height
            );
            gl.texImage2D(
              glBindType,
              0,
              gl.RGB,
              gl.RGB,
              gl.UNSIGNED_BYTE,
              cropImage
            ); // Set parameters for rendering any size

            gl.texParameteri(glBindType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(glBindType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(glBindType, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(glBindType, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // Reactivate first texture unit

            gl.activeTexture(gl.TEXTURE0);
          }
        } // Set parameters for rendering any size

        gl.texParameteri(glBindType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(glBindType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(glBindType, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(glBindType, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      } else {
        // Look up vertex coordinates location
        program.vertPosLocation = gl.getAttribLocation(program, "a_vertCoord");
        gl.enableVertexAttribArray(program.vertPosLocation); // Create buffers

        if (!cubeVertBuf) cubeVertBuf = gl.createBuffer();
        if (!cubeVertTexCoordBuf) cubeVertTexCoordBuf = gl.createBuffer();
        if (!cubeVertIndBuf) cubeVertIndBuf = gl.createBuffer(); // Bind texture coordinate buffer and pass coordinates to WebGL

        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertTexCoordBuf);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
          gl.STATIC_DRAW
        ); // Bind square index buffer and pass indicies to WebGL

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertIndBuf);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2, 0, 2, 3]),
          gl.STATIC_DRAW
        ); // Find uniforms

        program.perspUniform = gl.getUniformLocation(program, "u_perspMatrix");
        program.cubeUniform = gl.getUniformLocation(program, "u_cubeMatrix"); //program.colorUniform = gl.getUniformLocation(program, 'u_color');

        program.level = -1;
        program.currentNodes = [];
        program.nodeCache = [];
        program.nodeCacheTimestamp = 0;
      } // Check if there was an error

      var err = gl.getError();

      if (err !== 0) {
        console.log("Error: Something went wrong with WebGL!", err);
        throw {
          type: "webgl error",
        };
      }

      callback();
    };
    /**
     * Destroy renderer.
     * @memberof Renderer
     * @instance
     */

    this.destroy = function () {
      if (container !== undefined$1) {
        if (canvas !== undefined$1 && container.contains(canvas)) {
          container.removeChild(canvas);
        }

        if (world !== undefined$1 && container.contains(world)) {
          container.removeChild(world);
        }
      }

      if (gl) {
        // The spec says this is only supposed to simulate losing the WebGL
        // context, but in practice it tends to actually free the memory.
        var extension = gl.getExtension("WEBGL_lose_context");
        if (extension) extension.loseContext();
      }
    };
    /**
     * Resize renderer (call after resizing container).
     * @memberof Renderer
     * @instance
     */

    this.resize = function () {
      var pixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;

      if (gl) {
        if (gl.getError() == 1286) handleWebGLError1286();
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        if (imageType != "multires") {
          gl.uniform1f(
            program.aspectRatio,
            canvas.clientWidth / canvas.clientHeight
          );
        }
      }
    }; // Initialize canvas size

    this.resize();
    /**
     * Set renderer horizon pitch and roll.
     * @memberof Renderer
     * @instance
     */

    this.setPose = function (horizonPitch, horizonRoll) {
      pose = [horizonPitch, horizonRoll];
    };
    /**
     * Render new view of panorama.
     * @memberof Renderer
     * @instance
     * @param {number} pitch - Pitch to render at (in radians).
     * @param {number} yaw - Yaw to render at (in radians).
     * @param {number} hfov - Horizontal field of view to render with (in radians).
     * @param {Object} [params] - Extra configuration parameters.
     * @param {number} [params.roll] - Camera roll (in radians).
     * @param {boolean} [params.returnImage] - Return rendered image?
     */

    this.render = function (pitch, yaw, hfov, params) {
      var focal,
        i,
        s,
        roll = 0;
      if (params === undefined$1) params = {};
      if (params.roll) roll = params.roll; // Apply pitch and roll transformation if applicable

      if (pose !== undefined$1) {
        var horizonPitch = pose[0],
          horizonRoll = pose[1]; // Calculate new pitch and yaw

        var orig_pitch = pitch,
          orig_yaw = yaw,
          x =
            Math.cos(horizonRoll) * Math.sin(pitch) * Math.sin(horizonPitch) +
            Math.cos(pitch) *
              (Math.cos(horizonPitch) * Math.cos(yaw) +
                Math.sin(horizonRoll) * Math.sin(horizonPitch) * Math.sin(yaw)),
          y =
            -Math.sin(pitch) * Math.sin(horizonRoll) +
            Math.cos(pitch) * Math.cos(horizonRoll) * Math.sin(yaw),
          z =
            Math.cos(horizonRoll) * Math.cos(horizonPitch) * Math.sin(pitch) +
            Math.cos(pitch) *
              (-Math.cos(yaw) * Math.sin(horizonPitch) +
                Math.cos(horizonPitch) * Math.sin(horizonRoll) * Math.sin(yaw));
        pitch = Math.asin(Math.max(Math.min(z, 1), -1));
        yaw = Math.atan2(y, x); // Calculate roll

        var v = [
            Math.cos(orig_pitch) *
              (Math.sin(horizonRoll) *
                Math.sin(horizonPitch) *
                Math.cos(orig_yaw) -
                Math.cos(horizonPitch) * Math.sin(orig_yaw)),
            Math.cos(orig_pitch) * Math.cos(horizonRoll) * Math.cos(orig_yaw),
            Math.cos(orig_pitch) *
              (Math.cos(horizonPitch) *
                Math.sin(horizonRoll) *
                Math.cos(orig_yaw) +
                Math.sin(orig_yaw) * Math.sin(horizonPitch)),
          ],
          w = [
            -Math.cos(pitch) * Math.sin(yaw),
            Math.cos(pitch) * Math.cos(yaw),
          ];
        var roll_adj = Math.acos(
          Math.max(
            Math.min(
              (v[0] * w[0] + v[1] * w[1]) /
                (Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) *
                  Math.sqrt(w[0] * w[0] + w[1] * w[1])),
              1
            ),
            -1
          )
        );
        if (v[2] < 0) roll_adj = 2 * Math.PI - roll_adj;
        roll += roll_adj;
      } // If no WebGL

      if (!gl && (imageType == "multires" || imageType == "cubemap")) {
        // Determine face transforms
        s = fallbackImgSize / 2;
        var transforms = {
          f:
            "translate3d(-" + (s + 2) + "px, -" + (s + 2) + "px, -" + s + "px)",
          b:
            "translate3d(" +
            (s + 2) +
            "px, -" +
            (s + 2) +
            "px, " +
            s +
            "px) rotateX(180deg) rotateZ(180deg)",
          u:
            "translate3d(-" +
            (s + 2) +
            "px, -" +
            s +
            "px, " +
            (s + 2) +
            "px) rotateX(270deg)",
          d:
            "translate3d(-" +
            (s + 2) +
            "px, " +
            s +
            "px, -" +
            (s + 2) +
            "px) rotateX(90deg)",
          l:
            "translate3d(-" +
            s +
            "px, -" +
            (s + 2) +
            "px, " +
            (s + 2) +
            "px) rotateX(180deg) rotateY(90deg) rotateZ(180deg)",
          r:
            "translate3d(" +
            s +
            "px, -" +
            (s + 2) +
            "px, -" +
            (s + 2) +
            "px) rotateY(270deg)",
        };
        focal = 1 / Math.tan(hfov / 2);
        var zoom = (focal * canvas.clientWidth) / 2 + "px";
        var transform =
          "perspective(" +
          zoom +
          ") translateZ(" +
          zoom +
          ") rotateX(" +
          pitch +
          "rad) rotateY(" +
          yaw +
          "rad) "; // Apply face transforms

        var faces = Object.keys(transforms);

        for (i = 0; i < 6; i++) {
          var face = world.querySelector(".pnlm-" + faces[i] + "face");
          if (!face) continue; // ignore missing face to support partial cubemap/fallback image

          face.style.webkitTransform = transform + transforms[faces[i]];
          face.style.transform = transform + transforms[faces[i]];
        }

        return;
      }

      if (imageType != "multires") {
        // Calculate focal length from vertical field of view
        var vfov =
          2 *
          Math.atan(
            Math.tan(hfov * 0.5) /
              (gl.drawingBufferWidth / gl.drawingBufferHeight)
          );
        focal = 1 / Math.tan(vfov * 0.5); // Pass psi, theta, roll, and focal length

        gl.uniform1f(program.psi, yaw);
        gl.uniform1f(program.theta, pitch);
        gl.uniform1f(program.rot, roll);
        gl.uniform1f(program.f, focal);

        if (dynamic === true) {
          // Update texture if dynamic
          if (imageType == "equirectangular") {
            gl.bindTexture(gl.TEXTURE_2D, program.texture);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGB,
              gl.RGB,
              gl.UNSIGNED_BYTE,
              image
            );
          }
        } // Draw using current buffer

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        // Create perspective matrix
        var perspMatrix = makePersp(
          hfov,
          gl.drawingBufferWidth / gl.drawingBufferHeight,
          0.1,
          100.0
        ); // Find correct zoom level

        checkZoom(hfov); // Create rotation matrix

        var matrix = identityMatrix3();
        matrix = rotateMatrix(matrix, -roll, "z");
        matrix = rotateMatrix(matrix, -pitch, "x");
        matrix = rotateMatrix(matrix, yaw, "y");
        matrix = makeMatrix4(matrix); // Set matrix uniforms

        gl.uniformMatrix4fv(
          program.perspUniform,
          false,
          new Float32Array(transposeMatrix4(perspMatrix))
        );
        gl.uniformMatrix4fv(
          program.cubeUniform,
          false,
          new Float32Array(transposeMatrix4(matrix))
        ); // Find current nodes

        var rotPersp = rotatePersp(perspMatrix, matrix);
        program.nodeCache.sort(multiresNodeSort);

        if (
          program.nodeCache.length > 200 &&
          program.nodeCache.length > program.currentNodes.length + 50
        ) {
          // Remove older nodes from cache
          var removed = program.nodeCache.splice(
            200,
            program.nodeCache.length - 200
          );

          for (var j = 0; j < removed.length; j++) {
            // Explicitly delete textures
            gl.deleteTexture(removed[j].texture);
          }
        }

        program.currentNodes = [];
        var sides = ["f", "b", "u", "d", "l", "r"];

        for (s = 0; s < 6; s++) {
          var ntmp = new MultiresNode(
            vtmps[s],
            sides[s],
            1,
            0,
            0,
            image.fullpath
          );
          testMultiresNode(rotPersp, ntmp, pitch, yaw);
        }

        program.currentNodes.sort(multiresNodeRenderSort); // Unqueue any pending requests for nodes that are no longer visible

        for (i = pendingTextureRequests.length - 1; i >= 0; i--) {
          if (
            program.currentNodes.indexOf(pendingTextureRequests[i].node) === -1
          ) {
            pendingTextureRequests[i].node.textureLoad = false;
            pendingTextureRequests.splice(i, 1);
          }
        } // Allow one request to be pending, so that we can create a texture buffer for that in advance of loading actually beginning

        if (pendingTextureRequests.length === 0) {
          for (i = 0; i < program.currentNodes.length; i++) {
            var node = program.currentNodes[i];

            if (!node.texture && !node.textureLoad) {
              node.textureLoad = true;
              setTimeout(processNextTile, 0, node); // Only process one tile per frame to improve responsiveness

              break;
            }
          }
        } // Draw tiles

        multiresDraw();
      }

      if (params.returnImage !== undefined$1) {
        return canvas.toDataURL("image/png");
      }
    };
    /**
     * Check if images are loading.
     * @memberof Renderer
     * @instance
     * @returns {boolean} Whether or not images are loading.
     */

    this.isLoading = function () {
      if (gl && imageType == "multires") {
        for (var i = 0; i < program.currentNodes.length; i++) {
          if (!program.currentNodes[i].textureLoaded) {
            return true;
          }
        }
      }

      return false;
    };
    /**
     * Retrieve renderer's canvas.
     * @memberof Renderer
     * @instance
     * @returns {HTMLElement} Renderer's canvas.
     */

    this.getCanvas = function () {
      return canvas;
    };
    /**
     * Sorting method for multires nodes.
     * @private
     * @param {MultiresNode} a - First node.
     * @param {MultiresNode} b - Second node.
     * @returns {number} Base tiles first, then higher timestamp first.
     */

    function multiresNodeSort(a, b) {
      // Base tiles are always first
      if (a.level == 1 && b.level != 1) {
        return -1;
      }

      if (b.level == 1 && a.level != 1) {
        return 1;
      } // Higher timestamp first

      return b.timestamp - a.timestamp;
    }
    /**
     * Sorting method for multires node rendering.
     * @private
     * @param {MultiresNode} a - First node.
     * @param {MultiresNode} b - Second node.
     * @returns {number} Lower zoom levels first, then closest to center first.
     */

    function multiresNodeRenderSort(a, b) {
      // Lower zoom levels first
      if (a.level != b.level) {
        return a.level - b.level;
      } // Lower distance from center first

      return a.diff - b.diff;
    }
    /**
     * Draws multires nodes.
     * @private
     */

    function multiresDraw() {
      if (!program.drawInProgress) {
        program.drawInProgress = true;
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var i = 0; i < program.currentNodes.length; i++) {
          if (program.currentNodes[i].textureLoaded > 1) {
            //var color = program.currentNodes[i].color;
            //gl.uniform4f(program.colorUniform, color[0], color[1], color[2], 1.0);
            // Bind vertex buffer and pass vertices to WebGL
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertBuf);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array(program.currentNodes[i].vertices),
              gl.STATIC_DRAW
            );
            gl.vertexAttribPointer(
              program.vertPosLocation,
              3,
              gl.FLOAT,
              false,
              0,
              0
            ); // Prep for texture

            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertTexCoordBuf);
            gl.vertexAttribPointer(
              program.texCoordLocation,
              2,
              gl.FLOAT,
              false,
              0,
              0
            ); // Bind texture and draw tile

            gl.bindTexture(gl.TEXTURE_2D, program.currentNodes[i].texture); // Bind program.currentNodes[i].texture to TEXTURE0

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
          }
        }

        program.drawInProgress = false;
      }
    }
    /**
     * Creates new multires node.
     * @constructor
     * @private
     * @param {number[]} vertices - Node's verticies.
     * @param {string} side - Node's cube face.
     * @param {number} level - Node's zoom level.
     * @param {number} x - Node's x position.
     * @param {number} y - Node's y position.
     * @param {string} path - Node's path.
     */

    function MultiresNode(vertices, side, level, x, y, path) {
      this.vertices = vertices;
      this.side = side;
      this.level = level;
      this.x = x;
      this.y = y;
      this.path = path
        .replace("%s", side)
        .replace("%l", level)
        .replace("%x", x)
        .replace("%y", y);
    }
    /**
     * Test if multires node is visible. If it is, add it to current nodes,
     * load its texture, and load appropriate child nodes.
     * @private
     * @param {number[]} rotPersp - Rotated perspective matrix.
     * @param {MultiresNode} node - Multires node to check.
     * @param {number} pitch - Pitch to check at.
     * @param {number} yaw - Yaw to check at.
     * @param {number} hfov - Horizontal field of view to check at.
     */

    function testMultiresNode(rotPersp, node, pitch, yaw, hfov) {
      if (checkSquareInView(rotPersp, node.vertices)) {
        // Calculate central angle between center of view and center of tile
        var v = node.vertices;
        var x = v[0] + v[3] + v[6] + v[9];
        var y = v[1] + v[4] + v[7] + v[10];
        var z = v[2] + v[5] + v[8] + v[11];
        var r = Math.sqrt(x * x + y * y + z * z);
        var theta = Math.asin(z / r);
        var phi = Math.atan2(y, x);
        var ydiff = phi - yaw;
        ydiff +=
          ydiff > Math.PI ? -2 * Math.PI : ydiff < -Math.PI ? 2 * Math.PI : 0;
        ydiff = Math.abs(ydiff);
        node.diff = Math.acos(
          Math.sin(pitch) * Math.sin(theta) +
            Math.cos(pitch) * Math.cos(theta) * Math.cos(ydiff)
        ); // Add node to current nodes and load texture if needed

        var inCurrent = false;

        for (var k = 0; k < program.nodeCache.length; k++) {
          if (program.nodeCache[k].path == node.path) {
            inCurrent = true;
            program.nodeCache[k].timestamp = program.nodeCacheTimestamp++;
            program.nodeCache[k].diff = node.diff;
            program.currentNodes.push(program.nodeCache[k]);
            break;
          }
        }

        if (!inCurrent) {
          //node.color = [Math.random(), Math.random(), Math.random()];
          node.timestamp = program.nodeCacheTimestamp++;
          program.currentNodes.push(node);
          program.nodeCache.push(node);
        } // TODO: Test error
        // Create child nodes

        if (node.level < program.level) {
          var cubeSize =
            image.cubeResolution * Math.pow(2, node.level - image.maxLevel);
          var numTiles = Math.ceil(cubeSize * image.invTileResolution) - 1;
          var doubleTileSize = (cubeSize % image.tileResolution) * 2;
          var lastTileSize = (cubeSize * 2) % image.tileResolution;

          if (lastTileSize === 0) {
            lastTileSize = image.tileResolution;
          }

          if (doubleTileSize === 0) {
            doubleTileSize = image.tileResolution * 2;
          }

          var f = 0.5;

          if (node.x == numTiles || node.y == numTiles) {
            f =
              1.0 -
              image.tileResolution / (image.tileResolution + lastTileSize);
          }

          var i = 1.0 - f;
          var children = [];
          var vtmp, ntmp;
          var f1 = f,
            f2 = f,
            f3 = f,
            i1 = i,
            i2 = i,
            i3 = i; // Handle non-symmetric tiles

          if (lastTileSize < image.tileResolution) {
            if (node.x == numTiles && node.y != numTiles) {
              f2 = 0.5;
              i2 = 0.5;

              if (node.side == "d" || node.side == "u") {
                f3 = 0.5;
                i3 = 0.5;
              }
            } else if (node.x != numTiles && node.y == numTiles) {
              f1 = 0.5;
              i1 = 0.5;

              if (node.side == "l" || node.side == "r") {
                f3 = 0.5;
                i3 = 0.5;
              }
            }
          } // Handle small tiles that have fewer than four children

          if (doubleTileSize <= image.tileResolution) {
            if (node.x == numTiles) {
              f1 = 0;
              i1 = 1;

              if (node.side == "l" || node.side == "r") {
                f3 = 0;
                i3 = 1;
              }
            }

            if (node.y == numTiles) {
              f2 = 0;
              i2 = 1;

              if (node.side == "d" || node.side == "u") {
                f3 = 0;
                i3 = 1;
              }
            }
          }

          vtmp = [
            v[0],
            v[1],
            v[2],
            v[0] * f1 + v[3] * i1,
            v[1] * f + v[4] * i,
            v[2] * f3 + v[5] * i3,
            v[0] * f1 + v[6] * i1,
            v[1] * f2 + v[7] * i2,
            v[2] * f3 + v[8] * i3,
            v[0] * f + v[9] * i,
            v[1] * f2 + v[10] * i2,
            v[2] * f3 + v[11] * i3,
          ];
          ntmp = new MultiresNode(
            vtmp,
            node.side,
            node.level + 1,
            node.x * 2,
            node.y * 2,
            image.fullpath
          );
          children.push(ntmp);

          if (!(node.x == numTiles && doubleTileSize <= image.tileResolution)) {
            vtmp = [
              v[0] * f1 + v[3] * i1,
              v[1] * f + v[4] * i,
              v[2] * f3 + v[5] * i3,
              v[3],
              v[4],
              v[5],
              v[3] * f + v[6] * i,
              v[4] * f2 + v[7] * i2,
              v[5] * f3 + v[8] * i3,
              v[0] * f1 + v[6] * i1,
              v[1] * f2 + v[7] * i2,
              v[2] * f3 + v[8] * i3,
            ];
            ntmp = new MultiresNode(
              vtmp,
              node.side,
              node.level + 1,
              node.x * 2 + 1,
              node.y * 2,
              image.fullpath
            );
            children.push(ntmp);
          }

          if (
            !(node.x == numTiles && doubleTileSize <= image.tileResolution) &&
            !(node.y == numTiles && doubleTileSize <= image.tileResolution)
          ) {
            vtmp = [
              v[0] * f1 + v[6] * i1,
              v[1] * f2 + v[7] * i2,
              v[2] * f3 + v[8] * i3,
              v[3] * f + v[6] * i,
              v[4] * f2 + v[7] * i2,
              v[5] * f3 + v[8] * i3,
              v[6],
              v[7],
              v[8],
              v[9] * f1 + v[6] * i1,
              v[10] * f + v[7] * i,
              v[11] * f3 + v[8] * i3,
            ];
            ntmp = new MultiresNode(
              vtmp,
              node.side,
              node.level + 1,
              node.x * 2 + 1,
              node.y * 2 + 1,
              image.fullpath
            );
            children.push(ntmp);
          }

          if (!(node.y == numTiles && doubleTileSize <= image.tileResolution)) {
            vtmp = [
              v[0] * f + v[9] * i,
              v[1] * f2 + v[10] * i2,
              v[2] * f3 + v[11] * i3,
              v[0] * f1 + v[6] * i1,
              v[1] * f2 + v[7] * i2,
              v[2] * f3 + v[8] * i3,
              v[9] * f1 + v[6] * i1,
              v[10] * f + v[7] * i,
              v[11] * f3 + v[8] * i3,
              v[9],
              v[10],
              v[11],
            ];
            ntmp = new MultiresNode(
              vtmp,
              node.side,
              node.level + 1,
              node.x * 2,
              node.y * 2 + 1,
              image.fullpath
            );
            children.push(ntmp);
          }

          for (var j = 0; j < children.length; j++) {
            testMultiresNode(rotPersp, children[j], pitch, yaw);
          }
        }
      }
    }
    /**
     * Creates cube vertex array.
     * @private
     * @returns {number[]} Cube vertex array.
     */

    function createCube() {
      return [
        -1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        -1,
        -1,
        -1,
        -1,
        -1, // Front face
        1,
        1,
        1,
        -1,
        1,
        1,
        -1,
        -1,
        1,
        1,
        -1,
        1, // Back face
        -1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        -1,
        -1,
        1,
        -1, // Up face
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        -1,
        -1,
        1, // Down face
        -1,
        1,
        1,
        -1,
        1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        1, // Left face
        1,
        1,
        -1,
        1,
        1,
        1,
        1,
        -1,
        1,
        1,
        -1,
        -1, // Right face
      ];
    }
    /**
     * Creates 3x3 identity matrix.
     * @private
     * @returns {number[]} Identity matrix.
     */

    function identityMatrix3() {
      return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    /**
     * Rotates a 3x3 matrix.
     * @private
     * @param {number[]} m - Matrix to rotate.
     * @param {number[]} angle - Angle to rotate by in radians.
     * @param {string} axis - Axis to rotate about (`x`, `y`, or `z`).
     * @returns {number[]} Rotated matrix.
     */

    function rotateMatrix(m, angle, axis) {
      var s = Math.sin(angle);
      var c = Math.cos(angle);

      if (axis == "x") {
        return [
          m[0],
          c * m[1] + s * m[2],
          c * m[2] - s * m[1],
          m[3],
          c * m[4] + s * m[5],
          c * m[5] - s * m[4],
          m[6],
          c * m[7] + s * m[8],
          c * m[8] - s * m[7],
        ];
      }

      if (axis == "y") {
        return [
          c * m[0] - s * m[2],
          m[1],
          c * m[2] + s * m[0],
          c * m[3] - s * m[5],
          m[4],
          c * m[5] + s * m[3],
          c * m[6] - s * m[8],
          m[7],
          c * m[8] + s * m[6],
        ];
      }

      if (axis == "z") {
        return [
          c * m[0] + s * m[1],
          c * m[1] - s * m[0],
          m[2],
          c * m[3] + s * m[4],
          c * m[4] - s * m[3],
          m[5],
          c * m[6] + s * m[7],
          c * m[7] - s * m[6],
          m[8],
        ];
      }
    }
    /**
     * Turns a 3x3 matrix into a 4x4 matrix.
     * @private
     * @param {number[]} m - Input matrix.
     * @returns {number[]} Expanded matrix.
     */

    function makeMatrix4(m) {
      return [
        m[0],
        m[1],
        m[2],
        0,
        m[3],
        m[4],
        m[5],
        0,
        m[6],
        m[7],
        m[8],
        0,
        0,
        0,
        0,
        1,
      ];
    }
    /**
     * Transposes a 4x4 matrix.
     * @private
     * @param {number[]} m - Input matrix.
     * @returns {number[]} Transposed matrix.
     */

    function transposeMatrix4(m) {
      return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15],
      ];
    }
    /**
     * Creates a perspective matrix.
     * @private
     * @param {number} hfov - Desired horizontal field of view.
     * @param {number} aspect - Desired aspect ratio.
     * @param {number} znear - Near distance.
     * @param {number} zfar - Far distance.
     * @returns {number[]} Generated perspective matrix.
     */

    function makePersp(hfov, aspect, znear, zfar) {
      var fovy =
        2 *
        Math.atan(
          (Math.tan(hfov / 2) * gl.drawingBufferHeight) / gl.drawingBufferWidth
        );
      var f = 1 / Math.tan(fovy / 2);
      return [
        f / aspect,
        0,
        0,
        0,
        0,
        f,
        0,
        0,
        0,
        0,
        (zfar + znear) / (znear - zfar),
        (2 * zfar * znear) / (znear - zfar),
        0,
        0,
        -1,
        0,
      ];
    }
    /**
     * Processes a loaded texture image into a WebGL texture.
     * @private
     * @param {Image} img - Input image.
     * @param {WebGLTexture} tex - Texture to bind image to.
     */

    function processLoadedTexture(img, tex) {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    var pendingTextureRequests = []; // Based on http://blog.tojicode.com/2012/03/javascript-memory-optimization-and.html

    var loadTexture = (function () {
      var cacheTop = 4; // Maximum number of concurrents loads

      var textureImageCache = {};
      var crossOrigin;

      function TextureImageLoader() {
        var self = this;
        this.texture = this.callback = null;
        this.image = new Image();
        this.image.crossOrigin = crossOrigin ? crossOrigin : "anonymous";

        var loadFn = function loadFn() {
          if (self.image.width > 0 && self.image.height > 0) {
            // ignore missing tile to supporting partial image
            processLoadedTexture(self.image, self.texture);
            self.callback(self.texture, true);
          } else {
            self.callback(self.texture, false);
          }

          releaseTextureImageLoader(self);
        };

        this.image.addEventListener("load", loadFn);
        this.image.addEventListener("error", loadFn); // ignore missing tile file to support partial image, otherwise retry loop causes high CPU load
      }

      TextureImageLoader.prototype.loadTexture = function (
        src,
        texture,
        callback
      ) {
        this.texture = texture;
        this.callback = callback;
        this.image.src = src;
      };

      function PendingTextureRequest(node, src, texture, callback) {
        this.node = node;
        this.src = src;
        this.texture = texture;
        this.callback = callback;
      }

      function releaseTextureImageLoader(til) {
        if (pendingTextureRequests.length) {
          var req = pendingTextureRequests.shift();
          til.loadTexture(req.src, req.texture, req.callback);
        } else textureImageCache[cacheTop++] = til;
      }

      for (var i = 0; i < cacheTop; i++) {
        textureImageCache[i] = new TextureImageLoader();
      }

      return function (node, src, callback, _crossOrigin) {
        crossOrigin = _crossOrigin;
        var texture = gl.createTexture();
        if (cacheTop)
          textureImageCache[--cacheTop].loadTexture(src, texture, callback);
        else
          pendingTextureRequests.push(
            new PendingTextureRequest(node, src, texture, callback)
          );
        return texture;
      };
    })();
    /**
     * Loads image and creates texture for a multires node / tile.
     * @private
     * @param {MultiresNode} node - Input node.
     */

    function processNextTile(node) {
      loadTexture(
        node,
        node.path + "." + image.extension,
        function (texture, loaded) {
          node.texture = texture;
          node.textureLoaded = loaded ? 2 : 1;
        },
        globalParams.crossOrigin
      );
    }
    /**
     * Finds and applies optimal multires zoom level.
     * @private
     * @param {number} hfov - Horizontal field of view to check at.
     */

    function checkZoom(hfov) {
      // Find optimal level
      var newLevel = 1;

      while (
        newLevel < image.maxLevel &&
        gl.drawingBufferWidth >
          image.tileResolution *
            Math.pow(2, newLevel - 1) *
            Math.tan(hfov / 2) *
            0.707
      ) {
        newLevel++;
      } // Apply change

      program.level = newLevel;
    }
    /**
     * Rotates perspective matrix.
     * @private
     * @param {number[]} p - Perspective matrix.
     * @param {number[]} r - Rotation matrix.
     * @returns {number[]} Rotated matrix.
     */

    function rotatePersp(p, r) {
      return [
        p[0] * r[0],
        p[0] * r[1],
        p[0] * r[2],
        0,
        p[5] * r[4],
        p[5] * r[5],
        p[5] * r[6],
        0,
        p[10] * r[8],
        p[10] * r[9],
        p[10] * r[10],
        p[11],
        -r[8],
        -r[9],
        -r[10],
        0,
      ];
    }
    /**
     * Applies rotated perspective matrix to a 3-vector
     * (last element is inverted).
     * @private
     * @param {number[]} m - Rotated perspective matrix.
     * @param {number[]} v - Input 3-vector.
     * @returns {number[]} Resulting 4-vector.
     */

    function applyRotPerspToVec(m, v) {
      return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[4] * v[0] + m[5] * v[1] + m[6] * v[2],
        m[11] + m[8] * v[0] + m[9] * v[1] + m[10] * v[2],
        1 / (m[12] * v[0] + m[13] * v[1] + m[14] * v[2]),
      ];
    }
    /**
     * Checks if a vertex is visible.
     * @private
     * @param {number[]} m - Rotated perspective matrix.
     * @param {number[]} v - Input vertex.
     * @returns {number} 1 or -1 if the vertex is or is not visible,
     *      respectively.
     */

    function checkInView(m, v) {
      var vpp = applyRotPerspToVec(m, v);
      var winX = vpp[0] * vpp[3];
      var winY = vpp[1] * vpp[3];
      var winZ = vpp[2] * vpp[3];
      var ret = [0, 0, 0];
      if (winX < -1) ret[0] = -1;
      if (winX > 1) ret[0] = 1;
      if (winY < -1) ret[1] = -1;
      if (winY > 1) ret[1] = 1;
      if (winZ < -1 || winZ > 1) ret[2] = 1;
      return ret;
    }
    /**
     * Checks if a square (tile) is visible.
     * @private
     * @param {number[]} m - Rotated perspective matrix.
     * @param {number[]} v - Square's vertex array.
     * @returns {boolean} Whether or not the square is visible.
     */

    function checkSquareInView(m, v) {
      var check1 = checkInView(m, v.slice(0, 3));
      var check2 = checkInView(m, v.slice(3, 6));
      var check3 = checkInView(m, v.slice(6, 9));
      var check4 = checkInView(m, v.slice(9, 12));
      var testX = check1[0] + check2[0] + check3[0] + check4[0];
      if (testX == -4 || testX == 4) return false;
      var testY = check1[1] + check2[1] + check3[1] + check4[1];
      if (testY == -4 || testY == 4) return false;
      var testZ = check1[2] + check2[2] + check3[2] + check4[2];
      return testZ != 4;
    }
    /**
     * On iOS (iPhone 5c, iOS 10.3), this WebGL error occurs when the canvas is
     * too big. Unfortuately, there's no way to test for this beforehand, so we
     * reduce the canvas size if this error is thrown.
     * @private
     */

    function handleWebGLError1286() {
      console.log("Reducing canvas size due to error 1286!");
      canvas.width = Math.round(canvas.width / 2);
      canvas.height = Math.round(canvas.height / 2);
    }
  } // Vertex shader for equirectangular and cube

  var v = [
    "attribute vec2 a_texCoord;",
    "varying vec2 v_texCoord;",
    "void main() {", // Set position
    "gl_Position = vec4(a_texCoord, 0.0, 1.0);", // Pass the coordinates to the fragment shader
    "v_texCoord = a_texCoord;",
    "}",
  ].join(""); // Vertex shader for multires

  var vMulti = [
    "attribute vec3 a_vertCoord;",
    "attribute vec2 a_texCoord;",
    "uniform mat4 u_cubeMatrix;",
    "uniform mat4 u_perspMatrix;",
    "varying mediump vec2 v_texCoord;",
    "void main(void) {", // Set position
    "gl_Position = u_perspMatrix * u_cubeMatrix * vec4(a_vertCoord, 1.0);", // Pass the coordinates to the fragment shader
    "v_texCoord = a_texCoord;",
    "}",
  ].join(""); // Fragment shader

  var fragEquiCubeBase = [
    "precision highp float;", // mediump looks bad on some mobile devices
    "uniform float u_aspectRatio;",
    "uniform float u_psi;",
    "uniform float u_theta;",
    "uniform float u_f;",
    "uniform float u_h;",
    "uniform float u_v;",
    "uniform float u_vo;",
    "uniform float u_rot;",
    "const float PI = 3.14159265358979323846264;", // Texture
    "uniform sampler2D u_image0;",
    "uniform sampler2D u_image1;",
    "uniform bool u_splitImage;",
    "uniform samplerCube u_imageCube;", // Coordinates passed in from vertex shader
    "varying vec2 v_texCoord;", // Background color (display for partial panoramas)
    "uniform vec4 u_backgroundColor;",
    "void main() {", // Map canvas/camera to sphere
    "float x = v_texCoord.x * u_aspectRatio;",
    "float y = v_texCoord.y;",
    "float sinrot = sin(u_rot);",
    "float cosrot = cos(u_rot);",
    "float rot_x = x * cosrot - y * sinrot;",
    "float rot_y = x * sinrot + y * cosrot;",
    "float sintheta = sin(u_theta);",
    "float costheta = cos(u_theta);",
    "float a = u_f * costheta - rot_y * sintheta;",
    "float root = sqrt(rot_x * rot_x + a * a);",
    "float lambda = atan(rot_x / root, a / root) + u_psi;",
    "float phi = atan((rot_y * costheta + u_f * sintheta) / root);",
  ].join("\n"); // Fragment shader

  var fragCube =
    fragEquiCubeBase +
    [
      // Look up color from texture
      "float cosphi = cos(phi);",
      "gl_FragColor = textureCube(u_imageCube, vec3(cosphi*sin(lambda), sin(phi), cosphi*cos(lambda)));",
      "}",
    ].join("\n"); // Fragment shader

  var fragEquirectangular =
    fragEquiCubeBase +
    [
      // Wrap image
      "lambda = mod(lambda + PI, PI * 2.0) - PI;", // Map texture to sphere
      "vec2 coord = vec2(lambda / PI, phi / (PI / 2.0));", // Look up color from texture
      // Map from [-1,1] to [0,1] and flip y-axis
      "if(coord.x < -u_h || coord.x > u_h || coord.y < -u_v + u_vo || coord.y > u_v + u_vo)",
      "gl_FragColor = u_backgroundColor;",
      "else {",
      "if(u_splitImage) {", // Image was split into two textures to work around texture size limits
      "if(coord.x < 0.0)",
      "gl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / u_h, (-coord.y + u_v + u_vo) / (u_v * 2.0)));",
      "else",
      "gl_FragColor = texture2D(u_image1, vec2((coord.x + u_h) / u_h - 1.0, (-coord.y + u_v + u_vo) / (u_v * 2.0)));",
      "} else {",
      "gl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / (u_h * 2.0), (-coord.y + u_v + u_vo) / (u_v * 2.0)));",
      "}",
      "}",
      "}",
    ].join("\n"); // Fragment shader

  var fragMulti = [
    "varying mediump vec2 v_texCoord;",
    "uniform sampler2D u_sampler;", //'uniform mediump vec4 u_color;',
    "void main(void) {", // Look up color from texture
    "gl_FragColor = texture2D(u_sampler, v_texCoord);", //    'gl_FragColor = u_color;',
    "}",
  ].join("");
  return {
    renderer: function renderer(container, image, imagetype, dynamic) {
      return new Renderer(container, image, imagetype, dynamic);
    },
  };
})(
  typeof window === "undefined" ? null : window,
  typeof document === "undefined" ? null : document
);

var pannellum = (function (window, document, undefined$1) {
  function Viewer(container, initialConfig) {
    var _this = this; // Declare variables

    let config,
      renderer,
      dLastPitch,
      dLastYaw,
      dLastHfov,
      preview,
      isAdd = {},
      dTimeLookAtHotSpot = 600,
      dTimeZoomInHotSpot = 1500,
      dTimeZoomInAfterLoad = 500,
      dTimeToLoad = 1500,
      isUserInteracting = false,
      latestInteraction = Date.now(),
      onPointerDownPointerX = 0,
      onPointerDownPointerY = 0,
      onPointerDownPointerDist = -1,
      onPointerDownYaw = 0,
      onPointerDownPitch = 0,
      keysDown = new Array(10),
      fullscreenActive = false,
      loaded,
      error = false,
      listenersAdded = false,
      panoImage,
      prevTime,
      speed = {
        yaw: 0,
        pitch: 0,
        hfov: 0,
      },
      animating = false,
      orientation = false,
      orientationYawOffset = 0,
      autoRotateStart,
      autoRotateSpeed = 0,
      origHfov,
      origPitch,
      animatedMove = {},
      externalEventListeners = {},
      specifiedPhotoSphereExcludes = [],
      update = false,
      // Should we update when still to render dynamic content
      eps = 1e-6,
      hotspotsCreated = false,
      destroyed = false;
    var defaultConfig = {
      hfov: 100,
      minHfov: 50,
      multiResMinHfov: false,
      maxHfov: 120,
      pitch: 0,
      minPitch: -90,
      maxPitch: 90,
      yaw: 0,
      minYaw: -180,
      maxYaw: 180,
      roll: 0,
      haov: 360,
      vaov: 180,
      vOffset: 0,
      autoRotate: false,
      autoRotateInactivityDelay: -1,
      autoRotateStopDelay: 0,
      type: "equirectangular",
      northOffset: 0,
      showFullscreenCtrl: true,
      dynamic: false,
      dynamicUpdate: false,
      doubleClickZoom: true,
      keyboardZoom: true,
      mouseZoom: true,
      showZoomCtrl: true,
      autoLoad: false,
      showControls: true,
      orientationOnByDefault: false,
      hotSpotDebug: false,
      backgroundColor: [0, 0, 0],
      avoidShowingBackground: false,
      animationTimingFunction: timingFunction,
      draggable: true,
      disableKeyboardCtrl: false,
      crossOrigin: "anonymous",
      touchPanSpeedCoeffFactor: 1,
      capturedKeyNumbers: [
        16, 17, 27, 37, 38, 39, 40, 61, 65, 68, 83, 87, 107, 109, 173, 187, 189,
      ],
      friction: 0.15,
    }; // Translatable / configurable strings
    // Some strings contain '%s', which is a placeholder for inserted values
    // When setting strings in external configuration, `\n` should be used instead of `<br>` to insert line breaks

    defaultConfig.uiText = {
      // Labels
      loadButtonLabel: "Click to<br>Load<br>Panorama",
      loadingLabel: "Loading...",
      bylineLabel: "by %s",
      // One substitution: author
      // Errors
      noPanoramaError: "No panorama image was specified.",
      fileAccessError: "The file %s could not be accessed.",
      // One substitution: file URL
      malformedURLError: "There is something wrong with the panorama URL.",
      iOS8WebGLError:
        "Due to iOS 8's broken WebGL implementation, only " +
        "progressive encoded JPEGs work for your device (this " +
        "panorama uses standard encoding).",
      genericWebGLError:
        "Your browser does not have the necessary WebGL support to display this panorama.",
      textureSizeError:
        "This panorama is too big for your device! It's " +
        "%spx wide, but your device only supports images up to " +
        "%spx wide. Try another device." +
        " (If you're the author, try scaling down the image.)",
      // Two substitutions: image width, max image width
      unknownError: "Unknown error. Check developer console.",
    }; // Initialize container

    container =
      typeof container === "string"
        ? document.getElementById(container)
        : container;
    container.classList.add("pnlm-container");
    container.tabIndex = 0; // Create container for ui

    var uiContainer = document.createElement("div");
    uiContainer.className = "pnlm-ui";
    container.appendChild(uiContainer); // Create container for renderer

    var renderContainer = document.createElement("div");
    renderContainer.className = "pnlm-render-container";
    container.appendChild(renderContainer);
    var dragFix = document.createElement("div");
    dragFix.className = "pnlm-dragfix";
    uiContainer.appendChild(dragFix); // Display about information on right click

    var aboutMsg = document.createElement("span");
    aboutMsg.className = "pnlm-about-msg";
    aboutMsg.innerHTML =
      '<a href="https://solutions.viettel.vn/vi" target="_blank">Viettel Solution</a>';
    uiContainer.appendChild(aboutMsg);
    dragFix.addEventListener("contextmenu", aboutMessage); // Create info display

    var infoDisplay = {}; // Hot spot debug indicator

    var hotSpotDebugIndicator = document.createElement("div");
    hotSpotDebugIndicator.className =
      "pnlm-sprite pnlm-hot-spot-debug-indicator";
    uiContainer.appendChild(hotSpotDebugIndicator); // Panorama info

    infoDisplay.container = document.createElement("div");
    infoDisplay.container.className = "pnlm-panorama-info";
    infoDisplay.title = document.createElement("div");
    infoDisplay.title.className = "pnlm-title-box";
    infoDisplay.container.appendChild(infoDisplay.title);
    infoDisplay.description = document.createElement("div");
    infoDisplay.description.className = "pnlm-description-box";
    infoDisplay.container.appendChild(infoDisplay.description);
    infoDisplay.author = document.createElement("div");
    infoDisplay.author.className = "pnlm-author-box";
    infoDisplay.container.appendChild(infoDisplay.author);
    uiContainer.appendChild(infoDisplay.container); // Load box

    infoDisplay.load = {};
    infoDisplay.load.box = document.createElement("div");
    infoDisplay.load.box.className = "pnlm-load-box";
    infoDisplay.load.boxp = document.createElement("p");
    infoDisplay.load.box.appendChild(infoDisplay.load.boxp);
    infoDisplay.load.lbox = document.createElement("div");
    infoDisplay.load.lbox.className = "pnlm-lbox";
    infoDisplay.load.lbox.innerHTML = '<div class="pnlm-loading"></div>';
    infoDisplay.load.box.appendChild(infoDisplay.load.lbox);
    infoDisplay.load.lbar = document.createElement("div");
    infoDisplay.load.lbar.className = "pnlm-lbar";
    infoDisplay.load.lbarFill = document.createElement("div");
    infoDisplay.load.lbarFill.className = "pnlm-lbar-fill";
    infoDisplay.load.lbar.appendChild(infoDisplay.load.lbarFill);
    infoDisplay.load.box.appendChild(infoDisplay.load.lbar);
    infoDisplay.load.msg = document.createElement("p");
    infoDisplay.load.msg.className = "pnlm-lmsg";
    infoDisplay.load.box.appendChild(infoDisplay.load.msg);
    uiContainer.appendChild(infoDisplay.load.box); // Error message

    infoDisplay.errorMsg = document.createElement("div");
    infoDisplay.errorMsg.className = "pnlm-error-msg pnlm-info-box";
    uiContainer.appendChild(infoDisplay.errorMsg); // Create controls

    var controls = {};
    controls.container = document.createElement("div");
    controls.container.className = "pnlm-controls-container";
    uiContainer.appendChild(controls.container); // Load button

    controls.load = document.createElement("div");
    controls.load.className = "pnlm-load-button";
    controls.load.addEventListener("click", function () {
      processOptions();
      load();
    });
    uiContainer.appendChild(controls.load); // Zoom controls

    controls.zoom = document.createElement("div");
    controls.zoom.className = "pnlm-zoom-controls pnlm-controls";
    controls.zoomIn = document.createElement("div");
    controls.zoomIn.className = "pnlm-zoom-in pnlm-sprite pnlm-control";
    controls.zoomIn.addEventListener("click", zoomIn);
    controls.zoom.appendChild(controls.zoomIn);
    controls.zoomOut = document.createElement("div");
    controls.zoomOut.className = "pnlm-zoom-out pnlm-sprite pnlm-control";
    controls.zoomOut.addEventListener("click", zoomOut);
    controls.zoom.appendChild(controls.zoomOut);
    controls.container.appendChild(controls.zoom); // Fullscreen toggle

    controls.fullscreen = document.createElement("div");
    controls.fullscreen.addEventListener("click", toggleFullscreen);
    controls.fullscreen.className =
      "pnlm-fullscreen-toggle-button pnlm-sprite pnlm-fullscreen-toggle-button-inactive pnlm-controls pnlm-control";
    if (
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled
    )
      controls.container.appendChild(controls.fullscreen); // Device orientation toggle

    controls.orientation = document.createElement("div");
    controls.orientation.addEventListener("click", function (e) {
      if (orientation) stopOrientation();
      else startOrientation();
    });
    controls.orientation.addEventListener("mousedown", function (e) {
      e.stopPropagation();
    });
    controls.orientation.addEventListener("touchstart", function (e) {
      e.stopPropagation();
    });
    controls.orientation.addEventListener("pointerdown", function (e) {
      e.stopPropagation();
    });
    controls.orientation.className =
      "pnlm-orientation-button pnlm-orientation-button-inactive pnlm-sprite pnlm-controls pnlm-control";
    var orientationSupport = false;

    if (
      window.DeviceOrientationEvent &&
      location.protocol === "https:" &&
      navigator.userAgent.toLowerCase().indexOf("mobi") >= 0
    ) {
      // This user agent check is here because there's no way to check if a
      // device has an inertia measurement unit. We used to be able to check if a
      // DeviceOrientationEvent had non-null values, but with iOS 13 requiring a
      // permission prompt to access such events, this is no longer possible.
      controls.container.appendChild(controls.orientation);
      orientationSupport = true;
    } // Compass

    var compass = document.createElement("div");
    compass.className = "pnlm-compass pnlm-controls pnlm-control";
    uiContainer.appendChild(compass); // Load and process configuration

    if (initialConfig.firstScene) {
      // Activate first scene if specified in URL
      mergeConfig(initialConfig.firstScene);
    } else if (
      initialConfig["default"] &&
      initialConfig["default"].firstScene
    ) {
      // Activate first scene if specified in file
      mergeConfig(initialConfig["default"].firstScene);
    } else {
      mergeConfig(null);
    }

    processOptions(true);
    /**
     * Initializes viewer.
     * @private
     */

    function init() {
      // Display an error for IE 9 as it doesn't work but also doesn't otherwise
      // show an error (older versions don't work at all)
      // Based on: http://stackoverflow.com/a/10965203
      var div = document.createElement("div");
      div.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->";

      if (div.getElementsByTagName("i").length === 1) {
        anError();
        return;
      }

      origHfov = config.hfov;
      origPitch = config.pitch;
      var i, p;

      if (config.type === "cubemap") {
        panoImage = [];

        for (i = 0; i < 6; i++) {
          panoImage.push(new Image());
          panoImage[i].crossOrigin = config.crossOrigin;
        }

        infoDisplay.load.lbox.style.display = "block";
        infoDisplay.load.lbar.style.display = "none";
      } else if (config.type === "multires") {
        var c = JSON.parse(JSON.stringify(config.multiRes)); // Deep copy
        // Avoid "undefined" in path, check (optional) multiRes.basePath, too
        // Use only multiRes.basePath if it's an absolute URL

        if (
          config.basePath &&
          config.multiRes.basePath &&
          !/^(?:[a-z]+:)?\/\//i.test(config.multiRes.basePath)
        ) {
          c.basePath = config.basePath + config.multiRes.basePath;
        } else if (config.multiRes.basePath) {
          c.basePath = config.multiRes.basePath;
        } else if (config.basePath) {
          c.basePath = config.basePath;
        }

        panoImage = c;
      } else {
        if (config.dynamic === true) {
          panoImage = config.imageSource;
        } else {
          if (config.imageSource === undefined$1) {
            anError(config.uiText.noPanoramaError);
            return;
          }

          panoImage = new Image();
        }
      } // Configure image loading

      if (config.type === "cubemap") {
        // Quick loading counter for synchronous loading
        var itemsToLoad = 6;

        var onLoad = function onLoad() {
          itemsToLoad--;

          if (itemsToLoad === 0) {
            onImageLoad();
          }
        };

        var onError = function onError(e) {
          var a = document.createElement("a");
          a.href = e.target.src;
          a.innerHTML = a.href;
          anError(config.uiText.fileAccessError.replace("%s", a.outerHTML));
        };

        for (i = 0; i < panoImage.length; i++) {
          panoImage[i].onload = onLoad;
          panoImage[i].onerror = onError;
          p = config.cubeMap[i];

          if (p === "null") {
            // support partial cubemap image with explicitly empty faces
            console.log(
              "Will use background instead of missing cubemap face " + i
            );
            onLoad();
          } else {
            if (config.basePath && !absoluteURL(p)) {
              p = config.basePath + p;
            }

            panoImage[i].onload = onLoad;
            panoImage[i].onerror = onError;
            panoImage[i].src = sanitizeURL(p); //panoImage[i].src = encodeURI(p);
          }
        }
      } else if (config.type === "multires") {
        onImageLoad();
      } else {
        p = "";

        if (config.basePath) {
          p = config.basePath;
        }

        if (config.dynamic !== true) {
          // Still image
          p = absoluteURL(config.imageSource)
            ? config.imageSource
            : p + config.imageSource;

          panoImage.onload = function () {
            window.URL.revokeObjectURL(this.src); // Clean up

            onImageLoad();
          };

          var xhr = new XMLHttpRequest();

          xhr.onloadend = function () {
            if (xhr.status != 200) {
              // Display error if image can't be loaded
              var a = document.createElement("a");
              a.href = p;
              a.textContent = a.href;
              anError(config.uiText.fileAccessError.replace("%s", a.outerHTML));
            }

            var img = this.response;
            parseGPanoXMP(img);
            infoDisplay.load.msg.innerHTML = "";
          };

          xhr.onprogress = function (e) {
            if (e.lengthComputable) {
              // Display progress
              var percent = (e.loaded / e.total) * 100;
              infoDisplay.load.lbarFill.style.width = percent + "%";
              var unit, numerator, denominator;

              if (e.total > 1e6) {
                unit = "MB";
                numerator = (e.loaded / 1e6).toFixed(2);
                denominator = (e.total / 1e6).toFixed(2);
              } else if (e.total > 1e3) {
                unit = "kB";
                numerator = (e.loaded / 1e3).toFixed(1);
                denominator = (e.total / 1e3).toFixed(1);
              } else {
                unit = "B";
                numerator = e.loaded;
                denominator = e.total;
              }

              infoDisplay.load.msg.innerHTML =
                numerator + " / " + denominator + " " + unit;
            } else {
              // Display loading spinner
              infoDisplay.load.lbox.style.display = "block";
              infoDisplay.load.lbar.style.display = "none";
            }
          };

          try {
            xhr.open("GET", p, true);
          } catch (e) {
            // Malformed URL
            anError(config.uiText.malformedURLError);
          }

          xhr.responseType = "blob";
          xhr.setRequestHeader("Accept", "image/*,*/*;q=0.9");
          xhr.withCredentials = config.crossOrigin === "use-credentials";
          xhr.send();
        }
      }

      if (config.draggable) uiContainer.classList.add("pnlm-grab");
      uiContainer.classList.remove("pnlm-grabbing"); // Properly handle switching to dynamic scenes

      update = config.dynamicUpdate === true;

      if (config.dynamic && update) {
        panoImage = config.panorama;
        onImageLoad();
      }
    }
    /**
     * Test if URL is absolute or relative.
     * @private
     * @param {string} url - URL to test
     * @returns {boolean} True if absolute, else false
     */

    function absoluteURL(url) {
      // From http://stackoverflow.com/a/19709846
      return (
        new RegExp("^(?:[a-z]+:)?//", "i").test(url) ||
        url[0] === "/" ||
        url.slice(0, 5) === "blob:"
      );
    }
    /**
     * Create renderer and initialize event listeners once image is loaded.
     * @private
     */

    function onImageLoad() {
      if (!renderer) renderer = new libpannellum.renderer(renderContainer); // Only add event listeners once

      if (!listenersAdded) {
        listenersAdded = true;
        dragFix.addEventListener("mousedown", onDocumentMouseDown, false);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mouseup", onDocumentMouseUp, false);

        if (config.mouseZoom) {
          uiContainer.addEventListener(
            "mousewheel",
            onDocumentMouseWheel,
            false
          );
          uiContainer.addEventListener(
            "DOMMouseScroll",
            onDocumentMouseWheel,
            false
          );
        }

        if (config.doubleClickZoom) {
          dragFix.addEventListener("dblclick", onDocumentDoubleClick, false);
        }

        container.addEventListener(
          "mozfullscreenchange",
          onFullScreenChange,
          false
        );
        container.addEventListener(
          "webkitfullscreenchange",
          onFullScreenChange,
          false
        );
        container.addEventListener(
          "msfullscreenchange",
          onFullScreenChange,
          false
        );
        container.addEventListener(
          "fullscreenchange",
          onFullScreenChange,
          false
        );
        window.addEventListener("resize", onDocumentResize, false);
        window.addEventListener("orientationchange", onDocumentResize, false);

        if (!config.disableKeyboardCtrl) {
          container.addEventListener("keydown", onDocumentKeyPress, false);
          container.addEventListener("keyup", onDocumentKeyUp, false);
          container.addEventListener("blur", clearKeys, false);
        }

        document.addEventListener("mouseleave", onDocumentMouseUp, false);

        if (
          document.documentElement.style.pointerAction === "" &&
          document.documentElement.style.touchAction === ""
        ) {
          dragFix.addEventListener("pointerdown", onDocumentPointerDown, false);
          dragFix.addEventListener("pointermove", onDocumentPointerMove, false);
          dragFix.addEventListener("pointerup", onDocumentPointerUp, false);
          dragFix.addEventListener("pointerleave", onDocumentPointerUp, false);
        } else {
          dragFix.addEventListener("touchstart", onDocumentTouchStart, false);
          dragFix.addEventListener("touchmove", onDocumentTouchMove, false);
          dragFix.addEventListener("touchend", onDocumentTouchEnd, false);
        } // Deal with MS pointer events

        if (window.navigator.pointerEnabled)
          container.style.touchAction = "none";
      }

      renderInit();
      setHfov(config.hfov); // possibly adapt hfov after configuration and canvas is complete; prevents empty space on top or bottom by zomming out too much

      setTimeout(function () {}, 500);
    }
    /**
     * Parses Google Photo Sphere XMP Metadata.
     * https://developers.google.com/photo-sphere/metadata/
     * @private
     * @param {Image} image - Image to read XMP metadata from.
     */

    function parseGPanoXMP(image) {
      var reader = new FileReader();
      reader.addEventListener("loadend", function () {
        var img = reader.result; // This awful browser specific test exists because iOS 8 does not work
        // with non-progressive encoded JPEGs.

        if (
          navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/)
        ) {
          var flagIndex = img.indexOf("\xff\xc2");
          if (flagIndex < 0 || flagIndex > 65536)
            anError(config.uiText.iOS8WebGLError);
        }

        var start = img.indexOf("<x:xmpmeta");

        if (start > -1 && config.ignoreGPanoXMP !== true) {
          var xmpData = img.substring(start, img.indexOf("</x:xmpmeta>") + 12); // Extract the requested tag from the XMP data

          var getTag = function getTag(tag) {
            var result;

            if (xmpData.indexOf(tag + '="') >= 0) {
              result = xmpData.substring(
                xmpData.indexOf(tag + '="') + tag.length + 2
              );
              result = result.substring(0, result.indexOf('"'));
            } else if (xmpData.indexOf(tag + ">") >= 0) {
              result = xmpData.substring(
                xmpData.indexOf(tag + ">") + tag.length + 1
              );
              result = result.substring(0, result.indexOf("<"));
            }

            if (result !== undefined$1) {
              return Number(result);
            }

            return null;
          }; // Relevant XMP data

          var xmp = {
            fullWidth: getTag("GPano:FullPanoWidthPixels"),
            croppedWidth: getTag("GPano:CroppedAreaImageWidthPixels"),
            fullHeight: getTag("GPano:FullPanoHeightPixels"),
            croppedHeight: getTag("GPano:CroppedAreaImageHeightPixels"),
            topPixels: getTag("GPano:CroppedAreaTopPixels"),
            heading: getTag("GPano:PoseHeadingDegrees"),
            horizonPitch: getTag("GPano:PosePitchDegrees"),
            horizonRoll: getTag("GPano:PoseRollDegrees"),
          };

          if (
            xmp.fullWidth !== null &&
            xmp.croppedWidth !== null &&
            xmp.fullHeight !== null &&
            xmp.croppedHeight !== null &&
            xmp.topPixels !== null
          ) {
            // Set up viewer using GPano XMP data
            if (specifiedPhotoSphereExcludes.indexOf("haov") < 0)
              config.haov = (xmp.croppedWidth / xmp.fullWidth) * 360;
            if (specifiedPhotoSphereExcludes.indexOf("vaov") < 0)
              config.vaov = (xmp.croppedHeight / xmp.fullHeight) * 180;
            if (specifiedPhotoSphereExcludes.indexOf("vOffset") < 0)
              config.vOffset =
                ((xmp.topPixels + xmp.croppedHeight / 2) / xmp.fullHeight -
                  0.5) *
                -180;

            if (
              xmp.heading !== null &&
              specifiedPhotoSphereExcludes.indexOf("northOffset") < 0
            ) {
              // TODO: make sure this works correctly for partial panoramas
              config.northOffset = xmp.heading;

              if (config.compass !== false) {
                config.compass = true;
              }
            }

            if (xmp.horizonPitch !== null && xmp.horizonRoll !== null) {
              if (specifiedPhotoSphereExcludes.indexOf("horizonPitch") < 0)
                config.horizonPitch = xmp.horizonPitch;
              if (specifiedPhotoSphereExcludes.indexOf("horizonRoll") < 0)
                config.horizonRoll = xmp.horizonRoll;
            } // TODO: add support for initial view settings
          }
        } // Load panorama

        panoImage.src = window.URL.createObjectURL(image);
      });
      if (reader.readAsBinaryString !== undefined$1)
        reader.readAsBinaryString(image);
      else reader.readAsText(image);
    }
    /**
     * Displays an error message.
     * @private
     * @param {string} errorMsg - Error message to display. If not specified, a
     *      generic WebGL error is displayed.
     */

    function anError(errorMsg) {
      if (errorMsg === undefined$1) errorMsg = config.uiText.genericWebGLError;
      infoDisplay.errorMsg.innerHTML = "<p>" + errorMsg + "</p>";
      controls.load.style.display = "none";
      infoDisplay.load.box.style.display = "none";
      infoDisplay.errorMsg.style.display = "table";
      error = true;
      loaded = undefined$1;
      renderContainer.style.display = "none";
      fireEvent("error", errorMsg);
    }
    /**
     * Hides error message display.
     * @private
     */

    function clearError() {
      if (error) {
        infoDisplay.load.box.style.display = "none";
        infoDisplay.errorMsg.style.display = "none";
        error = false;
        renderContainer.style.display = "block";
        fireEvent("errorcleared");
      }
    }
    /**
     * Displays about message.
     * @private
     * @param {MouseEvent} event - Right click location
     */

    function aboutMessage(event) {
      var pos = mousePosition(event);
      aboutMsg.style.left = pos.x + "px";
      aboutMsg.style.top = pos.y + "px";
      clearTimeout(aboutMessage.t1);
      clearTimeout(aboutMessage.t2);
      aboutMsg.style.display = "block";
      aboutMsg.style.opacity = 1;
      aboutMessage.t1 = setTimeout(function () {
        aboutMsg.style.opacity = 0;
      }, 2000);
      aboutMessage.t2 = setTimeout(function () {
        aboutMsg.style.display = "none";
      }, 2500);
      event.preventDefault();
    }
    /**
     * Calculate mouse position relative to top left of viewer container.
     * @private
     * @param {MouseEvent} event - Mouse event to use in calculation
     * @returns {Object} Calculated X and Y coordinates
     */

    function mousePosition(event) {
      var bounds = container.getBoundingClientRect();
      var pos = {}; // pageX / pageY needed for iOS

      pos.x = (event.clientX || event.pageX) - bounds.left;
      pos.y = (event.clientY || event.pageY) - bounds.top;
      return pos;
    }
    /**
     * Event handler for mouse clicks. Initializes panning. Prints center and click
     * location coordinates when hot spot debugging is enabled.
     * @private
     * @param {MouseEvent} event - Document mouse down event.
     */

    function onDocumentMouseDown(event) {
      // Override default action
      event.preventDefault(); // But not all of it

      container.focus(); // Only do something if the panorama is loaded

      if (!loaded || !config.draggable) {
        fireEvent("mousedown", event);
        return;
      } // Calculate mouse position relative to top left of viewer container

      var pos = mousePosition(event); // Log pitch / yaw of mouse click when debugging / placing hot spots

      if (config.hotSpotDebug) {
        var coords = mouseEventToCoords(event);
        console.log(
          "Pitch: " +
            coords[0] +
            ", Yaw: " +
            coords[1] +
            ", Center Pitch: " +
            config.pitch +
            ", Center Yaw: " +
            config.yaw +
            ", HFOV: " +
            config.hfov
        );
      } // Turn off auto-rotation if enabled

      stopAnimation();
      stopOrientation();
      config.roll = 0;
      speed.hfov = 0;
      isUserInteracting = true;
      latestInteraction = Date.now();
      onPointerDownPointerX = pos.x;
      onPointerDownPointerY = pos.y;
      onPointerDownYaw = config.yaw;
      onPointerDownPitch = config.pitch;
      uiContainer.classList.add("pnlm-grabbing");
      uiContainer.classList.remove("pnlm-grab");
      fireEvent("mousedown", event);
      animateInit();
    }
    /**
     * Event handler for double clicks. Zooms in at clicked location
     * @private
     * @param {MouseEvent} event - Document mouse down event.
     */

    function onDocumentDoubleClick(event) {
      if (config.minHfov === config.hfov) {
        _this.setHfov(origHfov, 1000);
      } else {
        var coords = mouseEventToCoords(event);

        _this.lookAt(coords[0], coords[1], config.minHfov, 1000);
      }
    }

    function changeMouseCursor(event) {
      isAdd = { ...event };
      if (isAdd.isAddInfo === true || isAdd.isAddScene === true) {
        config.draggable = false;
        uiContainer.classList.remove("pnlm-grab");
        uiContainer.classList.add("pnlm-custom");
      } else {
        config.draggable = true;
        uiContainer.classList.add("pnlm-grab");
        uiContainer.classList.remove("pnlm-custom");
      }
    }
    /**
     * Calculate panorama pitch and yaw from location of mouse event.
     * @private
     * @param {MouseEvent} event - Document mouse down event.
     * @returns {number[]} [pitch, yaw]
     */

    function mouseEventToCoords(event) {
      var pos = mousePosition(event);
      var canvas = renderer.getCanvas();
      var canvasWidth = canvas.clientWidth,
        canvasHeight = canvas.clientHeight;
      var x = (pos.x / canvasWidth) * 2 - 1;
      var y = ((1 - (pos.y / canvasHeight) * 2) * canvasHeight) / canvasWidth;
      var focal = 1 / Math.tan((config.hfov * Math.PI) / 360);
      var s = Math.sin((config.pitch * Math.PI) / 180);
      var c = Math.cos((config.pitch * Math.PI) / 180);
      var a = focal * c - y * s;
      var root = Math.sqrt(x * x + a * a);
      var pitch = (Math.atan((y * c + focal * s) / root) * 180) / Math.PI;
      var yaw = (Math.atan2(x / root, a / root) * 180) / Math.PI + config.yaw;
      if (yaw < -180) yaw += 360;
      if (yaw > 180) yaw -= 360;
      return [pitch, yaw];
    }
    /**
     * Event handler for mouse moves. Pans center of view.
     * @private
     * @param {MouseEvent} event - Document mouse move event.
     */

    function onDocumentMouseMove(event) {
      if (isUserInteracting && loaded) {
        latestInteraction = Date.now();
        var canvas = renderer.getCanvas();
        var canvasWidth = canvas.clientWidth,
          canvasHeight = canvas.clientHeight;
        var pos = mousePosition(event); //TODO: This still isn't quite right

        var yaw =
          ((((Math.atan((onPointerDownPointerX / canvasWidth) * 2 - 1) -
            Math.atan((pos.x / canvasWidth) * 2 - 1)) *
            180) /
            Math.PI) *
            config.hfov) /
            90 +
          onPointerDownYaw;
        speed.yaw = ((yaw - config.yaw) % 360) * 0.2;
        config.yaw = yaw;
        var vfov =
          (2 *
            Math.atan(
              (Math.tan((config.hfov / 360) * Math.PI) * canvasHeight) /
                canvasWidth
            ) *
            180) /
          Math.PI;
        var pitch =
          ((((Math.atan((pos.y / canvasHeight) * 2 - 1) -
            Math.atan((onPointerDownPointerY / canvasHeight) * 2 - 1)) *
            180) /
            Math.PI) *
            vfov) /
            90 +
          onPointerDownPitch;
        speed.pitch = (pitch - config.pitch) * 0.2;
        config.pitch = pitch;
      }
    }
    /**
     * Event handler for mouse up events. Stops panning.
     * @private
     */

    function onDocumentMouseUp(event) {
      if (!isUserInteracting) {
        return;
      }

      isUserInteracting = false;

      if (Date.now() - latestInteraction > 15) {
        // Prevents jump when user rapidly moves mouse, stops, and then
        // releases the mouse button
        speed.pitch = speed.yaw = 0;
      }

      uiContainer.classList.add("pnlm-grab");
      uiContainer.classList.remove("pnlm-grabbing");
      latestInteraction = Date.now();
      fireEvent("mouseup", event);
    }
    /**
     * Event handler for touches. Initializes panning if one touch or zooming if
     * two touches.
     * @private
     * @param {TouchEvent} event - Document touch start event.
     */

    function onDocumentTouchStart(event) {
      // Only do something if the panorama is loaded
      if (!loaded || !config.draggable) {
        return;
      } // Turn off auto-rotation if enabled

      stopAnimation();
      stopOrientation();
      config.roll = 0;
      speed.hfov = 0; // Calculate touch position relative to top left of viewer container

      var pos0 = mousePosition(event.targetTouches[0]);
      onPointerDownPointerX = pos0.x;
      onPointerDownPointerY = pos0.y;

      if (event.targetTouches.length === 2) {
        // Down pointer is the center of the two fingers
        var pos1 = mousePosition(event.targetTouches[1]);
        onPointerDownPointerX += (pos1.x - pos0.x) * 0.5;
        onPointerDownPointerY += (pos1.y - pos0.y) * 0.5;
        onPointerDownPointerDist = Math.sqrt(
          (pos0.x - pos1.x) * (pos0.x - pos1.x) +
            (pos0.y - pos1.y) * (pos0.y - pos1.y)
        );
      }

      isUserInteracting = true;
      latestInteraction = Date.now();
      onPointerDownYaw = config.yaw;
      onPointerDownPitch = config.pitch;
      fireEvent("touchstart", event);
      animateInit();
    }
    /**
     * Event handler for touch movements. Pans center of view if one touch or
     * adjusts zoom if two touches.
     * @private
     * @param {TouchEvent} event - Document touch move event.
     */

    function onDocumentTouchMove(event) {
      if (!config.draggable) {
        return;
      } // Override default action

      event.preventDefault();

      if (loaded) {
        latestInteraction = Date.now();
      }

      if (isUserInteracting && loaded) {
        var pos0 = mousePosition(event.targetTouches[0]);
        var clientX = pos0.x;
        var clientY = pos0.y;

        if (
          event.targetTouches.length === 2 &&
          onPointerDownPointerDist != -1
        ) {
          var pos1 = mousePosition(event.targetTouches[1]);
          clientX += (pos1.x - pos0.x) * 0.5;
          clientY += (pos1.y - pos0.y) * 0.5;
          var clientDist = Math.sqrt(
            (pos0.x - pos1.x) * (pos0.x - pos1.x) +
              (pos0.y - pos1.y) * (pos0.y - pos1.y)
          );
          setHfov(config.hfov + (onPointerDownPointerDist - clientDist) * 0.1);
          onPointerDownPointerDist = clientDist;
        } // The smaller the config.hfov value (the more zoomed-in the user is), the faster
        // yaw/pitch are perceived to change on one-finger touchmove (panning) events and vice versa.
        // To improve usability at both small and large zoom levels (config.hfov values)
        // we introduce a dynamic pan speed coefficient.
        //
        // Currently this seems to *roughly* keep initial drag/pan start position close to
        // the user's finger while panning regardless of zoom level / config.hfov value.

        var touchmovePanSpeedCoeff =
          (config.hfov / 360) * config.touchPanSpeedCoeffFactor;
        var yaw =
          (onPointerDownPointerX - clientX) * touchmovePanSpeedCoeff +
          onPointerDownYaw;
        speed.yaw = ((yaw - config.yaw) % 360) * 0.2;
        config.yaw = yaw;
        var pitch =
          (clientY - onPointerDownPointerY) * touchmovePanSpeedCoeff +
          onPointerDownPitch;
        speed.pitch = (pitch - config.pitch) * 0.2;
        config.pitch = pitch;
      }
    }
    /**
     * Event handler for end of touches. Stops panning and/or zooming.
     * @private
     */

    function onDocumentTouchEnd() {
      isUserInteracting = false;

      if (Date.now() - latestInteraction > 150) {
        speed.pitch = speed.yaw = 0;
      }

      onPointerDownPointerDist = -1;
      latestInteraction = Date.now();
      fireEvent("touchend", event);
    }

    var pointerIDs = [],
      pointerCoordinates = [];
    /**
     * Event handler for touch starts in IE / Edge.
     * @private
     * @param {PointerEvent} event - Document pointer down event.
     */

    function onDocumentPointerDown(event) {
      if (event.pointerType === "touch") {
        // Only do something if the panorama is loaded
        if (!loaded || !config.draggable) return;
        pointerIDs.push(event.pointerId);
        pointerCoordinates.push({
          clientX: event.clientX,
          clientY: event.clientY,
        });
        event.targetTouches = pointerCoordinates;
        onDocumentTouchStart(event);
        event.preventDefault();
      }
    }
    /**
     * Event handler for touch moves in IE / Edge.
     * @private
     * @param {PointerEvent} event - Document pointer move event.
     */

    function onDocumentPointerMove(event) {
      if (event.pointerType === "touch") {
        if (!config.draggable) return;

        for (var i = 0; i < pointerIDs.length; i++) {
          if (event.pointerId === pointerIDs[i]) {
            pointerCoordinates[i].clientX = event.clientX;
            pointerCoordinates[i].clientY = event.clientY;
            event.targetTouches = pointerCoordinates;
            onDocumentTouchMove(event);
            event.preventDefault();
            return;
          }
        }
      }
    }
    /**
     * Event handler for touch ends in IE / Edge.
     * @private
     * @param {PointerEvent} event - Document pointer up event.
     */

    function onDocumentPointerUp(event) {
      if (event.pointerType === "touch") {
        var defined = false;

        for (var i = 0; i < pointerIDs.length; i++) {
          if (event.pointerId === pointerIDs[i]) pointerIDs[i] = undefined$1;
          if (pointerIDs[i]) defined = true;
        }

        if (!defined) {
          pointerIDs = [];
          pointerCoordinates = [];
          onDocumentTouchEnd();
        }

        event.preventDefault();
      }
    }
    /**
     * Event handler for mouse wheel. Changes zoom.
     * @private
     * @param {WheelEvent} event - Document mouse wheel event.
     */

    function onDocumentMouseWheel(event) {
      // Only do something if the panorama is loaded and mouse wheel zoom is enabled
      if (
        !loaded ||
        (config.mouseZoom === "fullscreenonly" && !fullscreenActive)
      ) {
        return;
      }

      event.preventDefault(); // Turn off auto-rotation if enabled

      stopAnimation();
      latestInteraction = Date.now();

      if (event.wheelDeltaY) {
        // WebKit
        setHfov(config.hfov - event.wheelDeltaY * 0.05);
        speed.hfov = event.wheelDelta < 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        // Opera / Explorer 9
        setHfov(config.hfov - event.wheelDelta * 0.05);
        speed.hfov = event.wheelDelta < 0 ? 1 : -1;
      } else if (event.detail) {
        // Firefox
        setHfov(config.hfov + event.detail * 1.5);
        speed.hfov = event.detail > 0 ? 1 : -1;
      }

      animateInit();
    }
    /**
     * Event handler for key presses. Updates list of currently pressed keys.
     * @private
     * @param {KeyboardEvent} event - Document key press event.
     */

    function onDocumentKeyPress(event) {
      // Turn off auto-rotation if enabled
      stopAnimation();
      latestInteraction = Date.now();
      stopOrientation();
      config.roll = 0; // Record key pressed

      var keynumber = event.which || event.keycode; // Override default action for keys that are used

      if (config.capturedKeyNumbers.indexOf(keynumber) < 0) return;
      event.preventDefault(); // If escape key is pressed

      if (keynumber === 27) {
        // If in fullscreen mode
        if (fullscreenActive) {
          toggleFullscreen();
        }
      } else {
        // Change key
        changeKey(keynumber, true);
      }
    }
    /**
     * Clears list of currently pressed keys.
     * @private
     */

    function clearKeys() {
      for (var i = 0; i < 10; i++) {
        keysDown[i] = false;
      }
    }
    /**
     * Event handler for key releases. Updates list of currently pressed keys.
     * @private
     * @param {KeyboardEvent} event - Document key up event.
     */

    function onDocumentKeyUp(event) {
      // Record key pressed
      var keynumber = event.which || event.keycode; // Override default action for keys that are used

      if (config.capturedKeyNumbers.indexOf(keynumber) < 0) return;
      event.preventDefault(); // Change key

      changeKey(keynumber, false);
    }
    /**
     * Updates list of currently pressed keys.
     * @private
     * @param {number} keynumber - Key number.
     * @param {boolean} value - Whether or not key is pressed.
     */

    function changeKey(keynumber, value) {
      var keyChanged = false;

      switch (keynumber) {
        // If minus key is released
        case 109:
        case 189:
        case 17:
        case 173:
          if (keysDown[0] != value) {
            keyChanged = true;
          }

          keysDown[0] = value;
          break;
        // If plus key is released

        case 107:
        case 187:
        case 16:
        case 61:
          if (keysDown[1] != value) {
            keyChanged = true;
          }

          keysDown[1] = value;
          break;
        // If up arrow is released

        case 38:
          if (keysDown[2] != value) {
            keyChanged = true;
          }

          keysDown[2] = value;
          break;
        // If "w" is released

        case 87:
          if (keysDown[6] != value) {
            keyChanged = true;
          }

          keysDown[6] = value;
          break;
        // If down arrow is released

        case 40:
          if (keysDown[3] != value) {
            keyChanged = true;
          }

          keysDown[3] = value;
          break;
        // If "s" is released

        case 83:
          if (keysDown[7] != value) {
            keyChanged = true;
          }

          keysDown[7] = value;
          break;
        // If left arrow is released

        case 37:
          if (keysDown[4] != value) {
            keyChanged = true;
          }

          keysDown[4] = value;
          break;
        // If "a" is released

        case 65:
          if (keysDown[8] != value) {
            keyChanged = true;
          }

          keysDown[8] = value;
          break;
        // If right arrow is released

        case 39:
          if (keysDown[5] != value) {
            keyChanged = true;
          }

          keysDown[5] = value;
          break;
        // If "d" is released

        case 68:
          if (keysDown[9] != value) {
            keyChanged = true;
          }

          keysDown[9] = value;
      }

      if (keyChanged && value) {
        if (typeof performance !== "undefined" && performance.now()) {
          prevTime = performance.now();
        } else {
          prevTime = Date.now();
        }

        animateInit();
      }
    }
    /**
     * Pans and/or zooms panorama based on currently pressed keys. Also handles
     * panorama "inertia" and auto rotation.
     * @private
     */

    function keyRepeat() {
      // Only do something if the panorama is loaded
      if (!loaded) {
        return;
      }

      var isKeyDown = false;
      var prevPitch = config.pitch;
      var prevYaw = config.yaw;
      var prevZoom = config.hfov;
      var newTime;

      if (typeof performance !== "undefined" && performance.now()) {
        newTime = performance.now();
      } else {
        newTime = Date.now();
      }

      if (prevTime === undefined$1) {
        prevTime = newTime;
      }

      var diff = ((newTime - prevTime) * config.hfov) / 1700;
      diff = Math.min(diff, 1.0); // If minus key is down

      if (keysDown[0] && config.keyboardZoom === true) {
        setHfov(config.hfov + (speed.hfov * 0.8 + 0.5) * diff);
        isKeyDown = true;
      } // If plus key is down

      if (keysDown[1] && config.keyboardZoom === true) {
        setHfov(config.hfov + (speed.hfov * 0.8 - 0.2) * diff);
        isKeyDown = true;
      } // If up arrow or "w" is down

      if (keysDown[2] || keysDown[6]) {
        // Pan up
        config.pitch += (speed.pitch * 0.8 + 0.2) * diff;
        isKeyDown = true;
      } // If down arrow or "s" is down

      if (keysDown[3] || keysDown[7]) {
        // Pan down
        config.pitch += (speed.pitch * 0.8 - 0.2) * diff;
        isKeyDown = true;
      } // If left arrow or "a" is down

      if (keysDown[4] || keysDown[8]) {
        // Pan left
        config.yaw += (speed.yaw * 0.8 - 0.2) * diff;
        isKeyDown = true;
      } // If right arrow or "d" is down

      if (keysDown[5] || keysDown[9]) {
        // Pan right
        config.yaw += (speed.yaw * 0.8 + 0.2) * diff;
        isKeyDown = true;
      }

      if (isKeyDown) latestInteraction = Date.now(); // If auto-rotate

      if (config.autoRotate) {
        // Pan
        if (newTime - prevTime > 0.001) {
          var timeDiff = (newTime - prevTime) / 1000;
          var yawDiff =
            ((speed.yaw / timeDiff) * diff - config.autoRotate * 0.2) *
            timeDiff;
          yawDiff =
            (-config.autoRotate > 0 ? 1 : -1) *
            Math.min(Math.abs(config.autoRotate * timeDiff), Math.abs(yawDiff));
          config.yaw += yawDiff;
        } // Deal with stopping auto rotation after a set delay

        if (config.autoRotateStopDelay) {
          config.autoRotateStopDelay -= newTime - prevTime;

          if (config.autoRotateStopDelay <= 0) {
            config.autoRotateStopDelay = false;
            autoRotateSpeed = config.autoRotate;
            config.autoRotate = 0;
          }
        }
      } // Animated moves

      if (animatedMove.pitch) {
        animateMove("pitch");
        prevPitch = config.pitch;
      }

      if (animatedMove.yaw) {
        animateMove("yaw");
        prevYaw = config.yaw;
      }

      if (animatedMove.hfov) {
        animateMove("hfov");
        prevZoom = config.hfov;
      } // "Inertia"

      if (diff > 0 && !config.autoRotate) {
        // "Friction"
        var slowDownFactor = 1 - config.friction; // Yaw

        if (
          !keysDown[4] &&
          !keysDown[5] &&
          !keysDown[8] &&
          !keysDown[9] &&
          !animatedMove.yaw
        ) {
          config.yaw += speed.yaw * diff * slowDownFactor;
        } // Pitch

        if (
          !keysDown[2] &&
          !keysDown[3] &&
          !keysDown[6] &&
          !keysDown[7] &&
          !animatedMove.pitch
        ) {
          config.pitch += speed.pitch * diff * slowDownFactor;
        } // Zoom

        if (!keysDown[0] && !keysDown[1] && !animatedMove.hfov) {
          setHfov(config.hfov + speed.hfov * diff * slowDownFactor);
        }
      }

      prevTime = newTime;

      if (diff > 0) {
        speed.yaw = speed.yaw * 0.8 + ((config.yaw - prevYaw) / diff) * 0.2;
        speed.pitch =
          speed.pitch * 0.8 + ((config.pitch - prevPitch) / diff) * 0.2;
        speed.hfov = speed.hfov * 0.8 + ((config.hfov - prevZoom) / diff) * 0.2; // Limit speed

        var maxSpeed = config.autoRotate ? Math.abs(config.autoRotate) : 5;
        speed.yaw = Math.min(maxSpeed, Math.max(speed.yaw, -maxSpeed));
        speed.pitch = Math.min(maxSpeed, Math.max(speed.pitch, -maxSpeed));
        speed.hfov = Math.min(maxSpeed, Math.max(speed.hfov, -maxSpeed));
      } // Stop movement if opposite controls are pressed

      if (keysDown[0] && keysDown[1]) {
        speed.hfov = 0;
      }

      if ((keysDown[2] || keysDown[6]) && (keysDown[3] || keysDown[7])) {
        speed.pitch = 0;
      }

      if ((keysDown[4] || keysDown[8]) && (keysDown[5] || keysDown[9])) {
        speed.yaw = 0;
      }
    }
    /**
     * Animates moves.
     * @param {string} axis - Axis to animate
     * @private
     */

    function animateMove(axis) {
      var t = animatedMove[axis];
      var normTime = Math.min(
        1,
        Math.max((Date.now() - t.startTime) / 1000 / (t.duration / 1000), 0)
      );
      var result =
        t.startPosition +
        config.animationTimingFunction(normTime) *
          (t.endPosition - t.startPosition);

      if (
        (t.endPosition > t.startPosition && result >= t.endPosition) ||
        (t.endPosition < t.startPosition && result <= t.endPosition) ||
        t.endPosition === t.startPosition
      ) {
        result = t.endPosition;
        speed[axis] = 0;
        delete animatedMove[axis];
      }

      config[axis] = result;
    }
    /**
     * @param {number} t - Normalized time in animation
     * @return {number} Position in animation
     * @private
     */

    function timingFunction(t) {
      // easeInOutQuad from https://gist.github.com/gre/1650294
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    /**
     * Event handler for document resizes. Updates viewer size and rerenders view.
     * @private
     */

    function onDocumentResize() {
      // Resize panorama renderer (moved to onFullScreenChange)
      //renderer.resize();
      //animateInit();
      // Kludge to deal with WebKit regression: https://bugs.webkit.org/show_bug.cgi?id=93525
      onFullScreenChange("resize");
    }
    /**
     * Initializes animation.
     * @private
     */

    function animateInit() {
      if (animating) {
        return;
      }

      animating = true;
      animate();
    }
    /**
     * Animates view, using requestAnimationFrame to trigger rendering.
     * @private
     */

    function animate() {
      if (destroyed) {
        return;
      }

      render();
      if (autoRotateStart) clearTimeout(autoRotateStart);

      if (isUserInteracting || orientation === true) {
        requestAnimationFrame(animate);
      } else if (
        keysDown[0] ||
        keysDown[1] ||
        keysDown[2] ||
        keysDown[3] ||
        keysDown[4] ||
        keysDown[5] ||
        keysDown[6] ||
        keysDown[7] ||
        keysDown[8] ||
        keysDown[9] ||
        config.autoRotate ||
        animatedMove.pitch ||
        animatedMove.yaw ||
        animatedMove.hfov ||
        Math.abs(speed.yaw) > 0.01 ||
        Math.abs(speed.pitch) > 0.01 ||
        Math.abs(speed.hfov) > 0.01
      ) {
        keyRepeat();

        if (
          config.autoRotateInactivityDelay >= 0 &&
          autoRotateSpeed &&
          Date.now() - latestInteraction > config.autoRotateInactivityDelay &&
          !config.autoRotate
        ) {
          config.autoRotate = autoRotateSpeed;

          _this.lookAt(origPitch, undefined$1, origHfov, 3000);
        }

        requestAnimationFrame(animate);
      } else if (
        renderer &&
        (renderer.isLoading() || (config.dynamic === true && update))
      ) {
        requestAnimationFrame(animate);
      } else {
        fireEvent("animatefinished", {
          pitch: _this.getPitch(),
          yaw: _this.getYaw(),
          hfov: _this.getHfov(),
        });
        animating = false;
        prevTime = undefined$1;
        var autoRotateStartTime =
          config.autoRotateInactivityDelay - (Date.now() - latestInteraction);

        if (autoRotateStartTime > 0) {
          autoRotateStart = setTimeout(function () {
            config.autoRotate = autoRotateSpeed;

            _this.lookAt(origPitch, undefined$1, origHfov, 3000);

            animateInit();
          }, autoRotateStartTime);
        } else if (config.autoRotateInactivityDelay >= 0 && autoRotateSpeed) {
          config.autoRotate = autoRotateSpeed;

          _this.lookAt(origPitch, undefined$1, origHfov, 3000);

          animateInit();
        }
      }
    }
    /**
     * Renders panorama view.
     * @private
     */

    function render() {
      var tmpyaw;

      if (loaded) {
        var canvas = renderer.getCanvas();

        if (config.autoRotate !== false) {
          // When auto-rotating this check needs to happen first (see issue #764)
          if (config.yaw > 180) {
            config.yaw -= 360;
          } else if (config.yaw < -180) {
            config.yaw += 360;
          }
        } // Keep a tmp value of yaw for autoRotate comparison later

        tmpyaw = config.yaw; // Optionally avoid showing background (empty space) on left or right by adapting min/max yaw

        var hoffcut = 0;

        if (config.avoidShowingBackground) {
          var hfov2 = config.hfov / 2,
            vfov2 =
              (Math.atan2(
                Math.tan((hfov2 / 180) * Math.PI),
                canvas.width / canvas.height
              ) *
                180) /
              Math.PI,
            transposed = config.vaov > config.haov;

          if (transposed) {
            vfov2 *
              (1 -
                Math.min(
                  Math.cos(((config.pitch - hfov2) / 180) * Math.PI),
                  Math.cos(((config.pitch + hfov2) / 180) * Math.PI)
                ));
          } else {
            hoffcut =
              hfov2 *
              (1 -
                Math.min(
                  Math.cos(((config.pitch - vfov2) / 180) * Math.PI),
                  Math.cos(((config.pitch + vfov2) / 180) * Math.PI)
                ));
          }
        } // Ensure the yaw is within min and max allowed

        var yawRange = config.maxYaw - config.minYaw,
          minYaw = -180,
          maxYaw = 180;

        if (yawRange < 360) {
          minYaw = config.minYaw + config.hfov / 2 + hoffcut;
          maxYaw = config.maxYaw - config.hfov / 2 - hoffcut;

          if (yawRange < config.hfov) {
            // Lock yaw to average of min and max yaw when both can be seen at once
            minYaw = maxYaw = (minYaw + maxYaw) / 2;
          }

          config.yaw = Math.max(minYaw, Math.min(maxYaw, config.yaw));
        }

        if (!(config.autoRotate !== false)) {
          // When not auto-rotating, this check needs to happen after the
          // previous check (see issue #698)
          if (config.yaw > 180) {
            config.yaw -= 360;
          } else if (config.yaw < -180) {
            config.yaw += 360;
          }
        } // Check if we autoRotate in a limited by min and max yaw
        // If so reverse direction

        if (
          config.autoRotate !== false &&
          tmpyaw != config.yaw &&
          prevTime !== undefined$1
        ) {
          // this condition prevents changing the direction initially
          config.autoRotate *= -1;
        } // Ensure the calculated pitch is within min and max allowed

        var vfov =
          ((2 *
            Math.atan(
              Math.tan((config.hfov / 180) * Math.PI * 0.5) /
                (canvas.width / canvas.height)
            )) /
            Math.PI) *
          180;
        var minPitch = config.minPitch + vfov / 2,
          maxPitch = config.maxPitch - vfov / 2;
        var pitchRange = config.maxPitch - config.minPitch;

        if (pitchRange < vfov) {
          // Lock pitch to average of min and max pitch when both can be seen at once
          minPitch = maxPitch = (minPitch + maxPitch) / 2;
        }

        if (isNaN(minPitch)) minPitch = -90;
        if (isNaN(maxPitch)) maxPitch = 90;
        config.pitch = Math.max(minPitch, Math.min(maxPitch, config.pitch));
        renderer.render(
          (config.pitch * Math.PI) / 180,
          (config.yaw * Math.PI) / 180,
          (config.hfov * Math.PI) / 180,
          {
            roll: (config.roll * Math.PI) / 180,
          }
        );
        renderHotSpots(); // Update compass

        if (config.compass) {
          compass.style.transform =
            "rotate(" + (-config.yaw - config.northOffset) + "deg)";
          compass.style.webkitTransform =
            "rotate(" + (-config.yaw - config.northOffset) + "deg)";
        }
      }
    }
    /**
     * Creates a new quaternion.
     * @private
     * @constructor
     * @param {Number} w - W value
     * @param {Number} x - X value
     * @param {Number} y - Y value
     * @param {Number} z - Z value
     */

    function Quaternion(w, x, y, z) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;
    }
    /**
     * Multiplies quaternions.
     * @private
     * @param {Quaternion} q - Quaternion to multiply
     * @returns {Quaternion} Result of multiplication
     */

    Quaternion.prototype.multiply = function (q) {
      return new Quaternion(
        this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
        this.x * q.w + this.w * q.x + this.y * q.z - this.z * q.y,
        this.y * q.w + this.w * q.y + this.z * q.x - this.x * q.z,
        this.z * q.w + this.w * q.z + this.x * q.y - this.y * q.x
      );
    };
    /**
     * Converts quaternion to Euler angles.
     * @private
     * @returns {Number[]} [phi angle, theta angle, psi angle]
     */

    Quaternion.prototype.toEulerAngles = function () {
      var phi = Math.atan2(
          2 * (this.w * this.x + this.y * this.z),
          1 - 2 * (this.x * this.x + this.y * this.y)
        ),
        theta = Math.asin(2 * (this.w * this.y - this.z * this.x)),
        psi = Math.atan2(
          2 * (this.w * this.z + this.x * this.y),
          1 - 2 * (this.y * this.y + this.z * this.z)
        );
      return [phi, theta, psi];
    };
    /**
     * Converts device orientation API Tait-Bryan angles to a quaternion.
     * @private
     * @param {Number} alpha - Alpha angle (in degrees)
     * @param {Number} beta - Beta angle (in degrees)
     * @param {Number} gamma - Gamma angle (in degrees)
     * @returns {Quaternion} Orientation quaternion
     */

    function taitBryanToQuaternion(alpha, beta, gamma) {
      var r = [
        beta ? (beta * Math.PI) / 180 / 2 : 0,
        gamma ? (gamma * Math.PI) / 180 / 2 : 0,
        alpha ? (alpha * Math.PI) / 180 / 2 : 0,
      ];
      var c = [Math.cos(r[0]), Math.cos(r[1]), Math.cos(r[2])],
        s = [Math.sin(r[0]), Math.sin(r[1]), Math.sin(r[2])];
      return new Quaternion(
        c[0] * c[1] * c[2] - s[0] * s[1] * s[2],
        s[0] * c[1] * c[2] - c[0] * s[1] * s[2],
        c[0] * s[1] * c[2] + s[0] * c[1] * s[2],
        c[0] * c[1] * s[2] + s[0] * s[1] * c[2]
      );
    }
    /**
     * Computes current device orientation quaternion from device orientation API
     * Tait-Bryan angles.
     * @private
     * @param {Number} alpha - Alpha angle (in degrees)
     * @param {Number} beta - Beta angle (in degrees)
     * @param {Number} gamma - Gamma angle (in degrees)
     * @returns {Quaternion} Orientation quaternion
     */

    function computeQuaternion(alpha, beta, gamma) {
      // Convert Tait-Bryan angles to quaternion
      var quaternion = taitBryanToQuaternion(alpha, beta, gamma); // Apply world transform

      quaternion = quaternion.multiply(
        new Quaternion(Math.sqrt(0.5), -Math.sqrt(0.5), 0, 0)
      ); // Apply screen transform

      var angle = window.orientation
        ? (-window.orientation * Math.PI) / 180 / 2
        : 0;
      return quaternion.multiply(
        new Quaternion(Math.cos(angle), 0, -Math.sin(angle), 0)
      );
    }
    /**
     * Event handler for device orientation API. Controls pointing.
     * @private
     * @param {DeviceOrientationEvent} event - Device orientation event.
     */

    function orientationListener(e) {
      if (e.hasOwnProperty("requestPermission")) e.requestPermission();
      var q = computeQuaternion(e.alpha, e.beta, e.gamma).toEulerAngles();

      if (typeof orientation === "number" && orientation < 10) {
        // This kludge is necessary because iOS sometimes provides a few stale
        // device orientation events when the listener is removed and then
        // readded. Thus, we skip the first 10 events to prevent this from
        // causing problems.
        orientation += 1;
      } else if (orientation === 10) {
        // Record starting yaw to prevent jumping
        orientationYawOffset = (q[2] / Math.PI) * 180 + config.yaw;
        orientation = true;
        requestAnimationFrame(animate);
      } else {
        config.pitch = (q[0] / Math.PI) * 180;
        config.roll = (-q[1] / Math.PI) * 180;
        config.yaw = (-q[2] / Math.PI) * 180 + orientationYawOffset;
      }
    }
    /**
     * Initializes renderer.
     * @private
     */

    function renderInit() {
      try {
        var params = {};
        if (config.horizonPitch !== undefined$1)
          params.horizonPitch = (config.horizonPitch * Math.PI) / 180;
        if (config.horizonRoll !== undefined$1)
          params.horizonRoll = (config.horizonRoll * Math.PI) / 180;
        if (config.backgroundColor !== undefined$1)
          params.backgroundColor = config.backgroundColor;
        renderer.init(
          panoImage,
          config.type,
          config.dynamic,
          (config.haov * Math.PI) / 180,
          (config.vaov * Math.PI) / 180,
          (config.vOffset * Math.PI) / 180,
          renderInitCallback,
          params
        );

        if (config.dynamic !== true) {
          // Allow image to be garbage collected
          panoImage = undefined$1;
        }
      } catch (event) {
        // Panorama not loaded
        // Display error if there is a bad texture
        if (event.type === "webgl error" || event.type === "no webgl") {
          anError();
        } else if (event.type === "webgl size error") {
          anError(
            config.uiText.textureSizeError
              .replace("%s", event.width)
              .replace("%s", event.maxWidth)
          );
        } else {
          anError(config.uiText.unknownError);
          throw event;
        }
      }
    }
    /**
     * Triggered when render initialization finishes. Handles fading between
     * scenes as well as showing the compass and hotspots and hiding the loading
     * display.
     * @private
     */

    function renderInitCallback() {
      // Fade if specified
      if (config.sceneFadeDuration && renderer.fadeImg !== undefined$1) {
        renderer.fadeImg.style.opacity = 0; // Remove image

        var fadeImg = renderer.fadeImg;
        delete renderer.fadeImg;
        setTimeout(function () {
          renderContainer.removeChild(fadeImg);
          fireEvent("scenechangefadedone");
        }, config.sceneFadeDuration);
      } // Show compass if applicable

      if (config.compass) {
        compass.style.display = "inline";
      } else {
        compass.style.display = "none";
      } // Show hotspots

      createHotSpots(); // Hide loading display

      infoDisplay.load.box.style.display = "none";

      if (preview !== undefined$1) {
        renderContainer.removeChild(preview);
        preview = undefined$1;
      }

      loaded = true;
      animateInit();
      fireEvent("load");
    }
    /**
     * Creates hot spot element for the current scene.
     * @private
     * @param {Object} hs - The configuration for the hotspot
     */

    function createHotSpot(hs) {
      // Make sure hot spot pitch and yaw are numbers
      hs.pitch = Number(hs.pitch) || 0;
      hs.yaw = Number(hs.yaw) || 0;
      var div = document.createElement("div");
      div.className = "pnlm-hotspot-base";
      if (hs.cssClass) div.className += " " + hs.cssClass;
      else
        div.className +=
          " pnlm-hotspot pnlm-sprite pnlm-" + escapeHTML(hs.type);
      var span = document.createElement("span");
      if (hs.text) span.innerHTML = escapeHTML(hs.text);
      var a;

      if (hs.video) {
        var video = document.createElement("video"),
          vidp = hs.video;
        if (config.basePath && !absoluteURL(vidp))
          vidp = config.basePath + vidp;
        video.src = sanitizeURL(vidp);
        video.controls = true;
        video.style.width = hs.width + "px";
        renderContainer.appendChild(div);
        span.appendChild(video);
      } else if (hs.image) {
        var imgp = hs.image;
        if (config.basePath && !absoluteURL(imgp))
          imgp = config.basePath + imgp;
        a = document.createElement("a");
        a.href = sanitizeURL(hs.URL ? hs.URL : imgp);
        a.target = "_blank";
        span.appendChild(a);
        var image = document.createElement("img");
        image.src = sanitizeURL(imgp);
        image.style.width = hs.width + "px";
        image.style.paddingTop = "5px";
        renderContainer.appendChild(div);
        a.appendChild(image);
        span.style.maxWidth = "initial";
      } else if (hs.URL) {
        a = document.createElement("a");
        a.href = sanitizeURL(hs.URL);

        if (hs.attributes) {
          for (var key in hs.attributes) {
            a.setAttribute(key, hs.attributes[key]);
          }
        } else {
          a.target = "_blank";
        }

        renderContainer.appendChild(a);
        div.className += " pnlm-pointer";
        span.className += " pnlm-pointer";
        a.appendChild(div);
      } else {
        if (hs.sceneId) {
          div.onclick = div.ontouchend = function () {
            if (!div.clicked) {
              div.clicked = true;
              dLastPitch = hs.pitch;
              dLastYaw = hs.yaw;
              dLastHfov = _this.getHfov();
              setTimeout(function () {
                lookAndWait(_this.getHfov(), dTimeLookAtHotSpot);
              }, 10); //--- first look directly at the hotspot
              lookAndWait(50, dTimeZoomInHotSpot); //--- then zoom in
              setTimeout(function () {
                _this.loadScene(hs.sceneId, dLastPitch, dLastYaw, 120);
              }, dTimeToLoad); // then load the new scene
              // loadScene(
              //   hs.sceneId,
              //   hs.targetPitch,
              //   hs.targetYaw,
              //   hs.targetHfov
              // );
            }

            return false;
          };

          div.className += " pnlm-pointer";
          span.className += " pnlm-pointer";
        }

        renderContainer.appendChild(div);
      }

      if (hs.createTooltipFunc) {
        hs.createTooltipFunc(div, hs.createTooltipArgs);
      } else if (hs.text || hs.video || hs.image) {
        div.classList.add("pnlm-tooltip");
        div.appendChild(span);
        span.style.wordBreak = "break-word";
        span.style.width = span.scrollWidth - 20 + "px";
        span.style.marginLeft =
          -(span.scrollWidth - div.offsetWidth) / 2 + "px";
        span.style.marginTop = -span.scrollHeight - 12 + "px";
      }

      if (hs.clickHandlerFunc) {
        div.addEventListener(
          "click",
          function (e) {
            hs.clickHandlerFunc(e, hs.clickHandlerArgs);
          },
          "false"
        );
        div.className += " pnlm-pointer";
        span.className += " pnlm-pointer";
      }

      hs.div = div;
    }

    function lookAndWait(dHfov, dTime) {
      // Initiate LookAt / Zoom
      var pZ = dLastPitch; // Or other pan angle to Zoom in on.
      var yZ = dLastYaw; // Or other yaw angle to Zoom in on.
      var vZ = dHfov; // Or other Hfov angle to Zoom in on.
      var pS = dTime; // Or other zoom speed
      _this.lookAt(pZ, yZ, vZ, pS);
      setTimeout(function () {
        waitForView(dLastPitch, dLastYaw, vZ);
      }, 1000);
    }

    function waitForView(dPitch, dYaw, dHfov) {
      var iCnt = 0;
      let pI = Math.round(_this.getPitch()); // get actual pitch and round
      let yI = Math.round(_this.getYaw()); // get actual yaw and round
      let vI = Math.round(_this.getHfov()); // get actual Hfov and round

      if (yI > 180) {
        yI = yI - 360;
        _this.setYaw(yI, 0);
      }
      if (yI < -180) {
        yI = yI + 360;
        _this.setYaw(yI, 0);
      }

      if (pI === dPitch && yI === dYaw && vI === dHfov) {
        // Has LookAt finished
        return true;
      } else {
        setTimeout(function () {
          waitForView(dPitch, dYaw, dHfov);
        }, 10);
      }
    }

    function sceneLoadListener() {
      //--- zoom a little bit into current viewing direction
      lookAndWait(110, dTimeZoomInAfterLoad);
    }
    /**
     * Creates hot spot elements for the current scene.
     * @private
     */

    function createHotSpots() {
      if (hotspotsCreated) return;

      if (!config.hotSpots) {
        config.hotSpots = [];
      } else {
        // Sort by pitch so tooltip is never obscured by another hot spot
        config.hotSpots = config.hotSpots.sort(function (a, b) {
          return a.pitch < b.pitch;
        });
        config.hotSpots.forEach(createHotSpot);
      }

      hotspotsCreated = true;
      renderHotSpots();
    }
    /**
     * Destroys currently created hot spot elements.
     * @private
     */

    function destroyHotSpots() {
      var hs = config.hotSpots;
      hotspotsCreated = false;
      delete config.hotSpots;

      if (hs) {
        for (var i = 0; i < hs.length; i++) {
          var current = hs[i].div;

          if (current) {
            while (
              current.parentNode &&
              current.parentNode != renderContainer
            ) {
              current = current.parentNode;
            }

            renderContainer.removeChild(current);
          }

          delete hs[i].div;
        }
      }
    }
    /**
     * Renders hot spot, updating its position and visibility.
     * @private
     */

    function renderHotSpot(hs) {
      var hsPitchSin = Math.sin((hs.pitch * Math.PI) / 180),
        hsPitchCos = Math.cos((hs.pitch * Math.PI) / 180),
        configPitchSin = Math.sin((config.pitch * Math.PI) / 180),
        configPitchCos = Math.cos((config.pitch * Math.PI) / 180),
        yawCos = Math.cos(((-hs.yaw + config.yaw) * Math.PI) / 180);
      var z =
        hsPitchSin * configPitchSin + hsPitchCos * yawCos * configPitchCos;

      if (
        (hs.yaw <= 90 && hs.yaw > -90 && z <= 0) ||
        ((hs.yaw > 90 || hs.yaw <= -90) && z <= 0)
      ) {
        hs.div.style.visibility = "hidden";
      } else {
        var yawSin = Math.sin(((-hs.yaw + config.yaw) * Math.PI) / 180),
          hfovTan = Math.tan((config.hfov * Math.PI) / 360);
        hs.div.style.visibility = "visible"; // Subpixel rendering doesn't work in Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=739176

        var canvas = renderer.getCanvas(),
          canvasWidth = canvas.clientWidth,
          canvasHeight = canvas.clientHeight;
        var coord = [
          ((-canvasWidth / hfovTan) * yawSin * hsPitchCos) / z / 2,
          ((-canvasWidth / hfovTan) *
            (hsPitchSin * configPitchCos -
              hsPitchCos * yawCos * configPitchSin)) /
            z /
            2,
        ]; // Apply roll

        var rollSin = Math.sin((config.roll * Math.PI) / 180),
          rollCos = Math.cos((config.roll * Math.PI) / 180);
        coord = [
          coord[0] * rollCos - coord[1] * rollSin,
          coord[0] * rollSin + coord[1] * rollCos,
        ]; // Apply transform

        coord[0] += (canvasWidth - hs.div.offsetWidth) / 2;
        coord[1] += (canvasHeight - hs.div.offsetHeight) / 2;
        var transform =
          "translate(" +
          coord[0] +
          "px, " +
          coord[1] +
          "px) translateZ(9999px) rotate(" +
          config.roll +
          "deg)";

        if (hs.scale) {
          transform += " scale(" + origHfov / config.hfov / z + ")";
        }

        hs.div.style.webkitTransform = transform;
        hs.div.style.MozTransform = transform;
        hs.div.style.transform = transform;
      }
    }
    /**
     * Renders hot spots, updating their positions and visibility.
     * @private
     */

    function renderHotSpots() {
      config.hotSpots.forEach(renderHotSpot);
    }
    /**
     * Merges a scene configuration into the current configuration.
     * @private
     * @param {string} sceneId - Identifier of scene configuration to merge in.
     */

    function mergeConfig(sceneId) {
      config = {};
      var k, s;
      var photoSphereExcludes = [
        "haov",
        "vaov",
        "vOffset",
        "northOffset",
        "horizonPitch",
        "horizonRoll",
      ];
      specifiedPhotoSphereExcludes = []; // Merge default config

      for (k in defaultConfig) {
        if (defaultConfig.hasOwnProperty(k)) {
          config[k] = defaultConfig[k];
        }
      } // Merge default scene config

      for (k in initialConfig["default"]) {
        if (initialConfig["default"].hasOwnProperty(k)) {
          if (k === "uiText") {
            for (s in initialConfig["default"].uiText) {
              if (initialConfig["default"].uiText.hasOwnProperty(s)) {
                config.uiText[s] = escapeHTML(
                  initialConfig["default"].uiText[s]
                );
              }
            }
          } else {
            config[k] = initialConfig["default"][k];

            if (photoSphereExcludes.indexOf(k) >= 0) {
              specifiedPhotoSphereExcludes.push(k);
            }
          }
        }
      } // Merge current scene config

      if (
        sceneId !== null &&
        sceneId !== "" &&
        initialConfig.scenes &&
        initialConfig.scenes[sceneId]
      ) {
        var scene = initialConfig.scenes[sceneId];

        for (k in scene) {
          if (scene.hasOwnProperty(k)) {
            if (k === "uiText") {
              for (s in scene.uiText) {
                if (scene.uiText.hasOwnProperty(s)) {
                  config.uiText[s] = escapeHTML(scene.uiText[s]);
                }
              }
            } else {
              config[k] = scene[k];

              if (photoSphereExcludes.indexOf(k) >= 0) {
                specifiedPhotoSphereExcludes.push(k);
              }
            }
          }
        }

        config.scene = sceneId;
      } // Merge initial config

      for (k in initialConfig) {
        if (initialConfig.hasOwnProperty(k)) {
          if (k === "uiText") {
            for (s in initialConfig.uiText) {
              if (initialConfig.uiText.hasOwnProperty(s)) {
                config.uiText[s] = escapeHTML(initialConfig.uiText[s]);
              }
            }
          } else {
            config[k] = initialConfig[k];

            if (photoSphereExcludes.indexOf(k) >= 0) {
              specifiedPhotoSphereExcludes.push(k);
            }
          }
        }
      }
    }
    /**
     * Processes configuration options.
     * @param {boolean} [isPreview] - Whether or not the preview is being displayed
     * @private
     */

    function processOptions(isPreview) {
      isPreview = isPreview ? isPreview : false; // Process preview first so it always loads before the browser hits its
      // maximum number of connections to a server as can happen with cubic
      // panoramas

      if (isPreview && "preview" in config) {
        var p = config.preview;
        if (config.basePath && !absoluteURL(p)) p = config.basePath + p;
        preview = document.createElement("div");
        preview.className = "pnlm-preview-img";
        preview.style.backgroundImage = "url('" + sanitizeURLForCss(p) + "')";
        renderContainer.appendChild(preview);
      } // Handle different preview values

      var title = config.title,
        author = config.author,
        description = config.description;

      if (isPreview) {
        if ("previewTitle" in config) config.title = config.previewTitle;
        if ("previewDescription" in config)
          config.description = config.previewDescription;
        if ("previewAuthor" in config) config.author = config.previewAuthor;
      } // Reset title / author display

      if (!config.hasOwnProperty("title")) infoDisplay.title.innerHTML = "";
      if (!config.hasOwnProperty("description"))
        infoDisplay.description.innerHTML = "";
      if (!config.hasOwnProperty("author")) infoDisplay.author.innerHTML = "";
      if (
        !config.hasOwnProperty("title") &&
        !config.hasOwnProperty("description") &&
        !config.hasOwnProperty("author")
      )
        infoDisplay.container.style.display = "none"; // Fill in load button label and loading box text

      controls.load.innerHTML = "<p>" + config.uiText.loadButtonLabel + "</p>";
      infoDisplay.load.boxp.innerHTML = config.uiText.loadingLabel; // Process other options

      for (var key in config) {
        if (config.hasOwnProperty(key)) {
          switch (key) {
            case "title":
              infoDisplay.title.innerHTML = escapeHTML(config[key]);
              infoDisplay.container.style.display = "inline";
              break;

            case "description":
              infoDisplay.description.innerHTML = escapeHTML(config[key]);
              infoDisplay.container.style.display = "inline";
              break;

            case "author":
              var authorText = escapeHTML(config[key]);

              if (config.authorURL) {
                var authorLink = document.createElement("a");
                authorLink.href = sanitizeURL(config["authorURL"]);
                authorLink.target = "_blank";
                authorLink.innerHTML = escapeHTML(config[key]);
                authorText = authorLink.outerHTML;
              }

              infoDisplay.author.innerHTML = config.uiText.bylineLabel.replace(
                "%s",
                authorText
              );
              infoDisplay.container.style.display = "inline";
              break;

            case "fallback":
              var link = document.createElement("a");
              link.href = sanitizeURL(config[key]);
              link.target = "_blank";
              link.textContent =
                "Click here to view this panorama in an alternative viewer.";
              var message = document.createElement("p");
              message.textContent = "Your browser does not support WebGL.";
              message.appendChild(document.createElement("br"));
              message.appendChild(link);
              infoDisplay.errorMsg.innerHTML = ""; // Removes all children nodes

              infoDisplay.errorMsg.appendChild(message);
              break;

            case "hfov":
              setHfov(Number(config[key]));
              break;

            case "autoLoad":
              if (config[key] === true && renderer === undefined$1) {
                // Show loading box
                infoDisplay.load.box.style.display = "inline"; // Hide load button

                controls.load.style.display = "none"; // Initialize

                init();
              }

              break;

            case "showZoomCtrl":
              if (config[key] && config.showControls != false) {
                // Show zoom controls
                controls.zoom.style.display = "block";
              } else {
                // Hide zoom controls
                controls.zoom.style.display = "none";
              }

              break;

            case "showFullscreenCtrl":
              if (
                config[key] &&
                config.showControls != false &&
                ("fullscreen" in document ||
                  "mozFullScreen" in document ||
                  "webkitIsFullScreen" in document ||
                  "msFullscreenElement" in document)
              ) {
                // Show fullscreen control
                controls.fullscreen.style.display = "block";
              } else {
                // Hide fullscreen control
                controls.fullscreen.style.display = "none";
              }

              break;

            case "hotSpotDebug":
              if (config[key]) hotSpotDebugIndicator.style.display = "block";
              else hotSpotDebugIndicator.style.display = "none";
              break;

            case "showControls":
              if (!config[key]) {
                controls.orientation.style.display = "none";
                controls.zoom.style.display = "none";
                controls.fullscreen.style.display = "none";
              }

              break;

            case "orientationOnByDefault":
              if (config[key]) {
                startOrientation();
                break;
              }
          }
        }
      }

      if (isPreview) {
        // Restore original values if changed for preview
        if (title) config.title = title;
        else delete config.title;
        if (description) config.description = description;
        else delete config.description;
        if (author) config.author = author;
        else delete config.author;
      }
    }
    /**
     * Toggles fullscreen mode.
     * @private
     */

    function toggleFullscreen() {
      if (loaded && !error) {
        if (!fullscreenActive) {
          try {
            if (container.requestFullscreen) {
              container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
              container.mozRequestFullScreen();
            } else if (container.msRequestFullscreen) {
              container.msRequestFullscreen();
            } else {
              container.webkitRequestFullScreen();
            }
          } catch (event) {
            // Fullscreen doesn't work
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }
    }
    /**
     * Event handler for fullscreen changes.
     * @private
     */

    function onFullScreenChange(resize) {
      if (
        document.fullscreenElement ||
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement
      ) {
        controls.fullscreen.classList.add(
          "pnlm-fullscreen-toggle-button-active"
        );
        fullscreenActive = true;
      } else {
        controls.fullscreen.classList.remove(
          "pnlm-fullscreen-toggle-button-active"
        );
        fullscreenActive = false;
      }

      if (resize !== "resize") fireEvent("fullscreenchange", fullscreenActive); // Resize renderer (deal with browser quirks and fixes #155)

      renderer.resize();
      setHfov(config.hfov);
      animateInit();
    }
    /**
     * Increases panorama zoom. For use with zoom button.
     * @private
     */

    function zoomIn() {
      if (loaded) {
        setHfov(config.hfov - 5);
        animateInit();
      }
    }
    /**
     * Decreases panorama zoom. For use with zoom button.
     * @private
     */

    function zoomOut() {
      if (loaded) {
        setHfov(config.hfov + 5);
        animateInit();
      }
    }
    /**
     * Clamps horzontal field of view to viewer's limits.
     * @private
     * @param {number} hfov - Input horizontal field of view (in degrees)
     * @return {number} - Clamped horizontal field of view (in degrees)
     */

    function constrainHfov(hfov) {
      // Keep field of view within bounds
      var minHfov = config.minHfov;

      if (config.type === "multires" && renderer && !config.multiResMinHfov) {
        minHfov = Math.min(
          minHfov,
          renderer.getCanvas().width /
            ((config.multiRes.cubeResolution / 90) * 0.9)
        );
      }

      if (minHfov > config.maxHfov) {
        // Don't change view if bounds don't make sense
        console.log("HFOV bounds do not make sense (minHfov > maxHfov).");
        return config.hfov;
      }

      var newHfov = config.hfov;

      if (hfov < minHfov) {
        newHfov = minHfov;
      } else if (hfov > config.maxHfov) {
        newHfov = config.maxHfov;
      } else {
        newHfov = hfov;
      } // Optionally avoid showing background (empty space) on top or bottom by adapting newHfov

      if (config.avoidShowingBackground && renderer) {
        var canvas = renderer.getCanvas();
        newHfov = Math.min(
          newHfov,
          (Math.atan(
            (Math.tan(((config.maxPitch - config.minPitch) / 360) * Math.PI) /
              canvas.height) *
              canvas.width
          ) *
            360) /
            Math.PI
        );
      }

      return newHfov;
    }
    /**
     * Sets viewer's horizontal field of view.
     * @private
     * @param {number} hfov - Desired horizontal field of view in degrees.
     */

    function setHfov(hfov) {
      config.hfov = constrainHfov(hfov);
      fireEvent("zoomchange", config.hfov);
    }
    /**
     * Stops auto rotation and animated moves.
     * @private
     */

    function stopAnimation() {
      animatedMove = {};
      autoRotateSpeed = config.autoRotate ? config.autoRotate : autoRotateSpeed;
      config.autoRotate = false;
    }
    /**
     * Loads panorama.
     * @private
     */

    function load() {
      // Since WebGL error handling is very general, first we clear any error box
      // since it is a new scene and the error from previous maybe because of lacking
      // memory etc and not because of a lack of WebGL support etc
      clearError();
      loaded = false;
      controls.load.style.display = "none";
      infoDisplay.load.box.style.display = "inline";
      init();
    }
    /**
     * Loads scene.
     * @private
     * @param {string} sceneId - Identifier of scene configuration to merge in.
     * @param {number} targetPitch - Pitch viewer should be centered on once scene loads.
     * @param {number} targetYaw - Yaw viewer should be centered on once scene loads.
     * @param {number} targetHfov - HFOV viewer should use once scene loads.
     * @param {boolean} [fadeDone] - If `true`, fade setup is skipped.
     */

    function loadScene(sceneId, targetPitch, targetYaw, targetHfov, fadeDone) {
      if (!loaded) fadeDone = true; // Don't try to fade when there isn't a scene loaded

      loaded = false;
      animatedMove = {}; // Set up fade if specified

      var fadeImg, workingPitch, workingYaw, workingHfov;

      if (config.sceneFadeDuration && !fadeDone) {
        var data = renderer.render(
          (config.pitch * Math.PI) / 180,
          (config.yaw * Math.PI) / 180,
          (config.hfov * Math.PI) / 180,
          {
            returnImage: true,
          }
        );

        if (data !== undefined$1) {
          fadeImg = new Image();
          fadeImg.className = "pnlm-fade-img";
          fadeImg.style.transition =
            "opacity " + config.sceneFadeDuration / 1000 + "s";
          fadeImg.style.width = "100%";
          fadeImg.style.height = "100%";

          fadeImg.onload = function () {
            loadScene(sceneId, targetPitch, targetYaw, targetHfov, true);
          };

          fadeImg.src = data;
          renderContainer.appendChild(fadeImg);
          renderer.fadeImg = fadeImg;
          return;
        }
      } // Set new pointing

      if (targetPitch === "same") {
        workingPitch = config.pitch;
      } else {
        workingPitch = targetPitch;
      }

      if (targetYaw === "same") {
        workingYaw = config.yaw;
      } else if (targetYaw === "sameAzimuth") {
        workingYaw =
          config.yaw +
          (config.northOffset || 0) -
          (initialConfig.scenes[sceneId].northOffset || 0);
      } else {
        workingYaw = targetYaw;
      }

      if (targetHfov === "same") {
        workingHfov = config.hfov;
      } else {
        workingHfov = targetHfov;
      } // Destroy hot spots from previous scene

      destroyHotSpots(); // Create the new config for the scene

      mergeConfig(sceneId); // Stop motion

      speed.yaw = speed.pitch = speed.hfov = 0; // Reload scene

      processOptions();

      if (workingPitch !== undefined$1) {
        config.pitch = workingPitch;
      }

      if (workingYaw !== undefined$1) {
        config.yaw = workingYaw;
      }

      if (workingHfov !== undefined$1) {
        config.hfov = workingHfov;
      }

      fireEvent("scenechange", sceneId);
      load();
    }
    /**
     * Stop using device orientation.
     * @private
     */

    function stopOrientation() {
      window.removeEventListener("deviceorientation", orientationListener);
      controls.orientation.classList.remove("pnlm-orientation-button-active");
      orientation = false;
    }
    /**
     * Start using device orientation.
     * @private
     */

    function startOrientation() {
      orientation = 1; // Fix for IOS 13 where the user needs to perform an action i.e click. Then we need to ask permission

      if (
        DeviceOrientationEvent &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        DeviceOrientationEvent.requestPermission()
          .then(function (response) {
            if (response === "granted") {
              window.addEventListener("deviceorientation", orientationListener);
            }
          })
          ["catch"](console.error);
      } else {
        window.addEventListener("deviceorientation", orientationListener);
      } // window.addEventListener('deviceorientation', orientationListener);

      controls.orientation.classList.add("pnlm-orientation-button-active");
    }
    /**
     * Escapes HTML string (to mitigate possible DOM XSS attacks).
     * @private
     * @param {string} s - String to escape
     * @returns {string} Escaped string
     */

    function escapeHTML(s) {
      if (!initialConfig.escapeHTML) return String(s).split("\n").join("<br>");
      return String(s)
        .split(/&/g)
        .join("&amp;")
        .split('"')
        .join("&quot;")
        .split("'")
        .join("&#39;")
        .split("<")
        .join("&lt;")
        .split(">")
        .join("&gt;")
        .split("/")
        .join("&#x2f;")
        .split("\n")
        .join("<br>"); // Allow line breaks
    }
    /**
     * Removes possibility of XSS attacks with URLs.
     * The URL cannot be of protocol 'javascript'.
     * @private
     * @param {string} url - URL to sanitize
     * @returns {string} Sanitized URL
     */

    function sanitizeURL(url) {
      if (url.trim().toLowerCase().indexOf("javascript:") === 0) {
        return "about:blank";
      }

      return url;
    }
    /**
     * Removes possibility of XSS atacks with URLs for CSS.
     * The URL will be sanitized with `sanitizeURL()` and single quotes
     * and double quotes escaped.
     * @private
     * @param {string} url - URL to sanitize
     * @returns {string} Sanitized URL
     */

    function sanitizeURLForCss(url) {
      return sanitizeURL(url).replace(/"/g, "%22").replace(/'/g, "%27");
    }
    /**
     * Checks whether or not a panorama is loaded.
     * @memberof Viewer
     * @instance
     * @returns {boolean} `true` if a panorama is loaded, else `false`
     */

    this.isLoaded = function () {
      return Boolean(loaded);
    };
    /**
     * Returns the pitch of the center of the view.
     * @memberof Viewer
     * @instance
     * @returns {number} Pitch in degrees
     */

    this.getPitch = function () {
      return config.pitch;
    };
    /**
     * Sets the pitch of the center of the view.
     * @memberof Viewer
     * @instance
     * @param {number} pitch - Pitch in degrees
     * @param {boolean|number} [animated=1000] - Animation duration in milliseconds or false for no animation
     * @param {function} [callback] - Function to call when animation finishes
     * @param {object} [callbackArgs] - Arguments to pass to callback function
     * @returns {Viewer} `this`
     */

    this.setPitch = function (pitch, animated, callback, callbackArgs) {
      latestInteraction = Date.now();

      if (Math.abs(pitch - config.pitch) <= eps) {
        if (typeof callback === "function") callback(callbackArgs);
        return this;
      }

      animated = animated === undefined$1 ? 1000 : Number(animated);

      if (animated) {
        animatedMove.pitch = {
          startTime: Date.now(),
          startPosition: config.pitch,
          endPosition: pitch,
          duration: animated,
        };
        if (typeof callback === "function")
          setTimeout(function () {
            callback(callbackArgs);
          }, animated);
      } else {
        config.pitch = pitch;
      }

      animateInit();
      return this;
    };
    /**
     * Returns the minimum and maximum allowed pitches (in degrees).
     * @memberof Viewer
     * @instance
     * @returns {number[]} [minimum pitch, maximum pitch]
     */

    this.getPitchBounds = function () {
      return [config.minPitch, config.maxPitch];
    };
    /**
     * Set the minimum and maximum allowed pitches (in degrees).
     * @memberof Viewer
     * @instance
     * @param {number[]} bounds - [minimum pitch, maximum pitch]
     * @returns {Viewer} `this`
     */

    this.setPitchBounds = function (bounds) {
      config.minPitch = Math.max(-90, Math.min(bounds[0], 90));
      config.maxPitch = Math.max(-90, Math.min(bounds[1], 90));
      return this;
    };
    /**
     * Returns the yaw of the center of the view.
     * @memberof Viewer
     * @instance
     * @returns {number} Yaw in degrees
     */

    this.getYaw = function () {
      return config.yaw;
    };
    /**
     * Sets the yaw of the center of the view.
     * @memberof Viewer
     * @instance
     * @param {number} yaw - Yaw in degrees [-180, 180]
     * @param {boolean|number} [animated=1000] - Animation duration in milliseconds or false for no animation
     * @param {function} [callback] - Function to call when animation finishes
     * @param {object} [callbackArgs] - Arguments to pass to callback function
     * @returns {Viewer} `this`
     */

    this.setYaw = function (yaw, animated, callback, callbackArgs) {
      latestInteraction = Date.now();

      if (Math.abs(yaw - config.yaw) <= eps) {
        if (typeof callback === "function") callback(callbackArgs);
        return this;
      }

      animated = animated === undefined$1 ? 1000 : Number(animated);
      yaw = ((yaw + 180) % 360) - 180; // Keep in bounds

      if (animated) {
        // Animate in shortest direction
        if (config.yaw - yaw > 180) yaw += 360;
        else if (yaw - config.yaw > 180) yaw -= 360;
        animatedMove.yaw = {
          startTime: Date.now(),
          startPosition: config.yaw,
          endPosition: yaw,
          duration: animated,
        };
        if (typeof callback === "function")
          setTimeout(function () {
            callback(callbackArgs);
          }, animated);
      } else {
        config.yaw = yaw;
      }

      animateInit();
      return this;
    };
    /**
     * Returns the minimum and maximum allowed pitches (in degrees).
     * @memberof Viewer
     * @instance
     * @returns {number[]} [yaw pitch, maximum yaw]
     */

    this.getYawBounds = function () {
      return [config.minYaw, config.maxYaw];
    };
    /**
     * Set the minimum and maximum allowed yaws (in degrees [-180, 180]).
     * @memberof Viewer
     * @instance
     * @param {number[]} bounds - [minimum yaw, maximum yaw]
     * @returns {Viewer} `this`
     */

    this.setYawBounds = function (bounds) {
      config.minYaw = Math.max(-180, Math.min(bounds[0], 180));
      config.maxYaw = Math.max(-180, Math.min(bounds[1], 180));
      return this;
    };
    /**
     * Returns the horizontal field of view.
     * @memberof Viewer
     * @instance
     * @returns {number} Horizontal field of view in degrees
     */

    this.getHfov = function () {
      return config.hfov;
    };
    /**
     * Sets the horizontal field of view.
     * @memberof Viewer
     * @instance
     * @param {number} hfov - Horizontal field of view in degrees
     * @param {boolean|number} [animated=1000] - Animation duration in milliseconds or false for no animation
     * @param {function} [callback] - Function to call when animation finishes
     * @param {object} [callbackArgs] - Arguments to pass to callback function
     * @returns {Viewer} `this`
     */

    this.setHfov = function (hfov, animated, callback, callbackArgs) {
      latestInteraction = Date.now();

      if (Math.abs(hfov - config.hfov) <= eps) {
        if (typeof callback === "function") callback(callbackArgs);
        return this;
      }

      animated = animated === undefined$1 ? 1000 : Number(animated);

      if (animated) {
        animatedMove.hfov = {
          startTime: Date.now(),
          startPosition: config.hfov,
          endPosition: constrainHfov(hfov),
          duration: animated,
        };
        if (typeof callback === "function")
          setTimeout(function () {
            callback(callbackArgs);
          }, animated);
      } else {
        setHfov(hfov);
      }

      animateInit();
      return this;
    };
    /**
     * Returns the minimum and maximum allowed horizontal fields of view
     * (in degrees).
     * @memberof Viewer
     * @instance
     * @returns {number[]} [minimum hfov, maximum hfov]
     */

    this.getHfovBounds = function () {
      return [config.minHfov, config.maxHfov];
    };
    /**
     * Set the minimum and maximum allowed horizontal fields of view (in degrees).
     * @memberof Viewer
     * @instance
     * @param {number[]} bounds - [minimum hfov, maximum hfov]
     * @returns {Viewer} `this`
     */

    this.setHfovBounds = function (bounds) {
      config.minHfov = Math.max(0, bounds[0]);
      config.maxHfov = Math.max(0, bounds[1]);
      return this;
    };
    /**
     * Set a new view. Any parameters not specified remain the same.
     * @memberof Viewer
     * @instance
     * @param {number} [pitch] - Target pitch
     * @param {number} [yaw] - Target yaw
     * @param {number} [hfov] - Target hfov
     * @param {boolean|number} [animated=1000] - Animation duration in milliseconds or false for no animation
     * @param {function} [callback] - Function to call when animation finishes
     * @param {object} [callbackArgs] - Arguments to pass to callback function
     * @returns {Viewer} `this`
     */

    this.lookAt = function (
      pitch,
      yaw,
      hfov,
      animated,
      callback,
      callbackArgs
    ) {
      animated = animated === undefined$1 ? 1000 : Number(animated);

      if (pitch !== undefined$1 && Math.abs(pitch - config.pitch) > eps) {
        this.setPitch(pitch, animated, callback, callbackArgs);
        callback = undefined$1;
      }

      if (yaw !== undefined$1 && Math.abs(yaw - config.yaw) > eps) {
        this.setYaw(yaw, animated, callback, callbackArgs);
        callback = undefined$1;
      }

      if (hfov !== undefined$1 && Math.abs(hfov - config.hfov) > eps) {
        this.setHfov(hfov, animated, callback, callbackArgs);
        callback = undefined$1;
      }

      if (typeof callback === "function") callback(callbackArgs);
      return this;
    };
    /**
     * Returns the panorama's north offset.
     * @memberof Viewer
     * @instance
     * @returns {number} North offset in degrees
     */

    this.getNorthOffset = function () {
      return config.northOffset;
    };
    /**
     * Sets the panorama's north offset.
     * @memberof Viewer
     * @instance
     * @param {number} heading - North offset in degrees
     * @returns {Viewer} `this`
     */

    this.setNorthOffset = function (heading) {
      config.northOffset = Math.min(360, Math.max(0, heading));
      animateInit();
      return this;
    };
    /**
     * Returns the panorama's horizon roll.
     * @memberof Viewer
     * @instance
     * @returns {number} Horizon roll in degrees
     */

    this.getHorizonRoll = function () {
      return config.horizonRoll;
    };
    /**
     * Sets the panorama's horizon roll.
     * @memberof Viewer
     * @instance
     * @param {number} roll - Horizon roll in degrees [-90, 90]
     * @returns {Viewer} `this`
     */

    this.setHorizonRoll = function (roll) {
      config.horizonRoll = Math.min(90, Math.max(-90, roll));
      renderer.setPose(
        (config.horizonPitch * Math.PI) / 180,
        (config.horizonRoll * Math.PI) / 180
      );
      animateInit();
      return this;
    };
    /**
     * Returns the panorama's horizon pitch.
     * @memberof Viewer
     * @instance
     * @returns {number} Horizon pitch in degrees
     */

    this.getHorizonPitch = function () {
      return config.horizonPitch;
    };
    /**
     * Sets the panorama's horizon pitch.
     * @memberof Viewer
     * @instance
     * @param {number} pitch - Horizon pitch in degrees [-90, 90]
     * @returns {Viewer} `this`
     */

    this.setHorizonPitch = function (pitch) {
      config.horizonPitch = Math.min(90, Math.max(-90, pitch));
      renderer.setPose(
        (config.horizonPitch * Math.PI) / 180,
        (config.horizonRoll * Math.PI) / 180
      );
      animateInit();
      return this;
    };
    /**
     * Start auto rotation.
     *
     * Before starting rotation, the viewer is panned to `pitch`.
     * @memberof Viewer
     * @instance
     * @param {number} [speed] - Auto rotation speed / direction. If not specified, previous value is used.
     * @param {number} [pitch] - The pitch to rotate at. If not specified, inital pitch is used.
     * @returns {Viewer} `this`
     */

    this.startAutoRotate = function (speed, pitch) {
      speed = speed || autoRotateSpeed || 1;
      pitch = pitch === undefined$1 ? origPitch : pitch;
      config.autoRotate = speed;

      _this.lookAt(pitch, undefined$1, origHfov, 3000);

      animateInit();
      return this;
    };
    /**
     * Stop auto rotation.
     * @memberof Viewer
     * @instance
     * @returns {Viewer} `this`
     */

    this.stopAutoRotate = function () {
      autoRotateSpeed = config.autoRotate ? config.autoRotate : autoRotateSpeed;
      config.autoRotate = false;
      config.autoRotateInactivityDelay = -1;
      return this;
    };

    this.showCompass = function (value) {
      config.compass = value;
      renderInitCallback();
      console.log(config);
      return this;
    };
    /**
     * Stops all movement.
     * @memberof Viewer
     * @instance
     */

    this.stopMovement = function () {
      stopAnimation();
      speed = {
        yaw: 0,
        pitch: 0,
        hfov: 0,
      };
    };
    /**
     * Returns the panorama renderer.
     * @memberof Viewer
     * @instance
     * @returns {Renderer}
     */

    this.getRenderer = function () {
      return renderer;
    };
    /**
     * Sets update flag for dynamic content.
     * @memberof Viewer
     * @instance
     * @param {boolean} bool - Whether or not viewer should update even when still
     * @returns {Viewer} `this`
     */

    this.setUpdate = function (bool) {
      update = bool === true;
      if (renderer === undefined$1) onImageLoad();
      else animateInit();
      return this;
    };

    this.changeMouseCursor = function (event) {
      return changeMouseCursor(event);
    };

    this.sceneLoadListener = function () {
      return sceneLoadListener();
    };
    /**
     * Calculate panorama pitch and yaw from location of mouse event.
     * @memberof Viewer
     * @instance
     * @param {MouseEvent} event - Document mouse down event.
     * @returns {number[]} [pitch, yaw]
     */

    this.mouseEventToCoords = function (event) {
      return mouseEventToCoords(event);
    };
    /**
     * Change scene being viewed.
     * @memberof Viewer
     * @instance
     * @param {string} sceneId - Identifier of scene to switch to.
     * @param {number} [pitch] - Pitch to use with new scene
     * @param {number} [yaw] - Yaw to use with new scene
     * @param {number} [hfov] - HFOV to use with new scene
     * @returns {Viewer} `this`
     */

    this.loadScene = function (sceneId, pitch, yaw, hfov) {
      if (loaded !== false) loadScene(sceneId, pitch, yaw, hfov);
      return this;
    };
    /**
     * Get ID of current scene.
     * @memberof Viewer
     * @instance
     * @returns {string} ID of current scene
     */

    this.getScene = function () {
      return config.scene;
    };
    /**
     * Get ID of all scenes.
     * @memberof Viewer
     * @instance
     * @returns [Object] ID of all scenes
     */

    this.getAllScenes = function () {
      var allScenes = [];
      Object.keys(initialConfig.scenes).forEach(function (scene) {
        allScenes.push(_defineProperty({}, scene, initialConfig.scenes[scene]));
      });
      return allScenes;
    };
    /**
     * Add a new scene.
     * @memberof Viewer
     * @instance
     * @param {string} sceneId - The ID of the new scene
     * @param {string} config - The configuration of the new scene
     * @returns {Viewer} `this`
     */

    this.addScene = function (sceneId, config) {
      initialConfig.scenes[sceneId] = config;
      return this;
    };
    /**
     * Remove a scene.
     * @memberof Viewer
     * @instance
     * @param {string} sceneId - The ID of the scene
     * @returns {boolean} False if the scene is the current scene or if the scene doesn't exists, else true
     */

    this.removeScene = function (sceneId) {
      if (
        config.scene === sceneId ||
        !initialConfig.scenes.hasOwnProperty(sceneId)
      )
        return false;
      delete initialConfig.scenes[sceneId];
      return true;
    };
    /**
     * Toggle fullscreen.
     * @memberof Viewer
     * @instance
     * @returns {Viewer} `this`
     */

    this.toggleFullscreen = function () {
      toggleFullscreen();
      return this;
    };
    /**
     * Get configuration of current scene.
     * @memberof Viewer
     * @instance
     * @returns {Object} Configuration of current scene
     */

    this.getConfig = function () {
      return config;
    };
    /**
     * Get viewer's container element.
     * @memberof Viewer
     * @instance
     * @returns {HTMLElement} Container `div` element
     */

    this.getContainer = function () {
      return container;
    };
    /**
     * Add a new hot spot.
     * @memberof Viewer
     * @instance
     * @param {Object} hs - The configuration for the hot spot
     * @param {string} [sceneId] - Adds hot spot to specified scene if provided, else to current scene
     * @returns {Viewer} `this`
     * @throws Throws an error if the scene ID is provided but invalid
     */

    this.addHotSpot = function (hs, sceneId) {
      if (sceneId === undefined$1 && config.scene === undefined$1) {
        // Not a tour
        config.hotSpots.push(hs);
      } else {
        // Tour
        var id = sceneId !== undefined$1 ? sceneId : config.scene;

        if (initialConfig.scenes.hasOwnProperty(id)) {
          if (!initialConfig.scenes[id].hasOwnProperty("hotSpots")) {
            initialConfig.scenes[id].hotSpots = []; // Create hot spots array if needed

            if (id === config.scene)
              config.hotSpots = initialConfig.scenes[id].hotSpots; // Link to current config
          }

          initialConfig.scenes[id].hotSpots.push(hs); // Add hot spot to config
        } else {
          throw "Invalid scene ID!";
        }
      }

      if (sceneId === undefined$1 || config.scene === sceneId) {
        // Add to current scene
        createHotSpot(hs);
        if (loaded) renderHotSpot(hs);
      }

      return this;
    };
    /**
     * Remove a hot spot.
     * @memberof Viewer
     * @instance
     * @param {string} hotSpotId - The ID of the hot spot
     * @param {string} [sceneId] - Removes hot spot from specified scene if provided, else from current scene
     * @returns {boolean} True if deletion is successful, else false
     */

    this.removeHotSpot = function (hotSpotId, sceneId) {
      if (sceneId === undefined$1 || config.scene === sceneId) {
        if (!config.hotSpots) return false;

        for (var i = 0; i < config.hotSpots.length; i++) {
          if (
            config.hotSpots[i].hasOwnProperty("id") &&
            config.hotSpots[i].id === hotSpotId
          ) {
            // Delete hot spot DOM elements
            var current = config.hotSpots[i].div;

            while (current.parentNode != renderContainer) {
              current = current.parentNode;
            }

            renderContainer.removeChild(current);
            delete config.hotSpots[i].div; // Remove hot spot from configuration

            config.hotSpots.splice(i, 1);
            return true;
          }
        }
      } else {
        if (initialConfig.scenes.hasOwnProperty(sceneId)) {
          if (!initialConfig.scenes[sceneId].hasOwnProperty("hotSpots"))
            return false;

          for (
            var j = 0;
            j < initialConfig.scenes[sceneId].hotSpots.length;
            j++
          ) {
            if (
              initialConfig.scenes[sceneId].hotSpots[j].hasOwnProperty("id") &&
              initialConfig.scenes[sceneId].hotSpots[j].id === hotSpotId
            ) {
              // Remove hot spot from configuration
              initialConfig.scenes[sceneId].hotSpots.splice(j, 1);
              return true;
            }
          }
        } else {
          return false;
        }
      }
    };
    /**
     * This method should be called if the viewer's container is resized.
     * @memberof Viewer
     * @instance
     */

    this.resize = function () {
      if (renderer) onDocumentResize();
    };
    /**
     * Check if a panorama is loaded.
     * @memberof Viewer
     * @instance
     * @returns {boolean} True if a panorama is loaded, else false
     */

    this.isLoaded = function () {
      return loaded;
    };
    /**
     * Check if device orientation control is supported.
     * @memberof Viewer
     * @instance
     * @returns {boolean} True if supported, else false
     */

    this.isOrientationSupported = function () {
      return orientationSupport || false;
    };
    /**
     * Stop using device orientation.
     * @memberof Viewer
     * @instance
     */

    this.stopOrientation = function () {
      stopOrientation();
    };
    /**
     * Start using device orientation (does nothing if not supported).
     * @memberof Viewer
     * @instance
     */

    this.startOrientation = function () {
      if (orientationSupport) startOrientation();
    };
    /**
     * Check if device orientation control is currently activated.
     * @memberof Viewer
     * @instance
     * @returns {boolean} True if active, else false
     */

    this.isOrientationActive = function () {
      return Boolean(orientation);
    };
    /**
     * Subscribe listener to specified event.
     * @memberof Viewer
     * @instance
     * @param {string} type - Type of event to subscribe to.
     * @param {Function} listener - Listener function to subscribe to event.
     * @returns {Viewer} `this`
     */

    this.on = function (type, listener) {
      externalEventListeners[type] = externalEventListeners[type] || [];
      externalEventListeners[type].push(listener);
      return this;
    };
    /**
     * Remove an event listener (or listeners).
     * @memberof Viewer
     * @param {string} [type] - Type of event to remove listeners from. If not specified, all listeners are removed.
     * @param {Function} [listener] - Listener function to remove. If not specified, all listeners of specified type are removed.
     * @returns {Viewer} `this`
     */

    this.off = function (type, listener) {
      if (!type) {
        // Remove all listeners if type isn't specified
        externalEventListeners = {};
        return this;
      }

      if (listener) {
        var i = externalEventListeners[type].indexOf(listener);

        if (i >= 0) {
          // Remove listener if found
          externalEventListeners[type].splice(i, 1);
        }

        if (externalEventListeners[type].length === 0) {
          // Remove category if empty
          delete externalEventListeners[type];
        }
      } else {
        // Remove category of listeners if listener isn't specified
        delete externalEventListeners[type];
      }

      return this;
    };
    /**
     * Fire listeners attached to specified event.
     * @private
     * @param {string} [type] - Type of event to fire listeners for.
     */

    function fireEvent(type) {
      if (type in externalEventListeners) {
        // Reverse iteration is useful, if event listener is removed inside its definition
        for (var i = externalEventListeners[type].length; i > 0; i--) {
          externalEventListeners[type][
            externalEventListeners[type].length - i
          ].apply(null, [].slice.call(arguments, 1));
        }
      }
    }
    /**
     * Destructor.
     * @instance
     * @memberof Viewer
     */

    this.destroy = function () {
      destroyed = true;
      clearTimeout(autoRotateStart);
      if (renderer) renderer.destroy();

      if (listenersAdded) {
        document.removeEventListener("mousemove", onDocumentMouseMove, false);
        document.removeEventListener("mouseup", onDocumentMouseUp, false);
        container.removeEventListener(
          "mozfullscreenchange",
          onFullScreenChange,
          false
        );
        container.removeEventListener(
          "webkitfullscreenchange",
          onFullScreenChange,
          false
        );
        container.removeEventListener(
          "msfullscreenchange",
          onFullScreenChange,
          false
        );
        container.removeEventListener(
          "fullscreenchange",
          onFullScreenChange,
          false
        );
        window.removeEventListener("resize", onDocumentResize, false);
        window.removeEventListener(
          "orientationchange",
          onDocumentResize,
          false
        );
        container.removeEventListener("keydown", onDocumentKeyPress, false);
        container.removeEventListener("keyup", onDocumentKeyUp, false);
        container.removeEventListener("blur", clearKeys, false);
        document.removeEventListener("mouseleave", onDocumentMouseUp, false);
      }

      container.innerHTML = "";
      container.classList.remove("pnlm-container");
    };
  }

  return {
    viewer: function viewer(container, config) {
      return new Viewer(container, config);
    },
  };
})(
  typeof window === "undefined" ? null : window,
  typeof document === "undefined" ? null : document
);

var myPromise = function myPromise(condition) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key];
  }

  var promise = new Promise(function (resolve, reject) {
    if (condition) {
      if (args !== []) {
        resolve.apply(void 0, args);
      } else {
        reject("Argruments cannot be empty");
      }
    } else {
      reject("Something when wrong!!!");
    }
  });
  return promise;
};

var configs = {
  uiText: {
    loadButtonLabel: "Click to<br>Load<br>Panorama",
    loadingLabel: "Loading...",
    bylineLabel: "by %s",
    noPanoramaError: "No panorama image was specified.",
    fileAccessError: "The file %s could not be accessed.",
    malformedURLError: "There is something wrong with the panorama URL.",
    iOS8WebGLError:
      "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
    genericWebGLError:
      "Your browser does not have the necessary WebGL support to display this panorama.",
    textureSizeError:
      "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
    unknownError: "Unknown error. Check developer console.",
  },
  styles: {
    width: "100%",
    height: "90%",
    background: "#000000",
  },
  equirectangularOptions: {
    haov: 360,
    vaov: 180,
    vOffset: 0,
    ignoreGPanoXMP: false,
  },
  panoramaConfigs: {
    title: "",
    author: "",
    description: "",
    autoLoad: false,
    autoRotate: 0,
    autoRotateInactivityDelay: 0,
    autoRotateStopDelay: 0,
    preview: "",
    showZoomCtrl: true,
    keyboardZoom: true,
    mouseZoom: true,
    doubleClickZoom: false,
    draggable: true,
    friction: 0.15,
    disableKeyboardCtrl: false,
    showFullscreenCtrl: true,
    showControls: true,
    touchPanSpeedCoeffFactor: 1,
    yaw: 0,
    pitch: 0,
    maxPitch: 90,
    minPitch: -90,
    maxYaw: 180,
    minYaw: -180,
    hfov: 100,
    minHfov: 50,
    maxHfov: 120,
    multiResMinHfov: false,
    backgroundColor: [0, 0, 0],
    avoidShowingBackground: false,
    compass: false,
    northOffset: 0,
    hotSpots: [],
    hotSpotDebug: false,
  },
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === "undefined") {
    return;
  }

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = `/* Pannellum 2.4.1, https://github.com/mpetroff/pannellum */\r\n\r\n.pnlm-container {\r\n  margin: 0;\r\n  padding: 0;\r\n  overflow: hidden;\r\n  position: relative;\r\n  cursor: default;\r\n  width: 100%;\r\n  height: 100%;\r\n  font-family: Helvetica, \"Nimbus Sans L\", \"Liberation Sans\", Arial, sans-serif;\r\n  background: #f4f4f4 url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2267%22%20height%3D%22100%22%20viewBox%3D%220%200%2067%20100%22%3E%0A%3Cpath%20stroke%3D%22%23ccc%22%20fill%3D%22none%22%20d%3D%22M33.5%2C50%2C0%2C63%2C33.5%2C75%2C67%2C63%2C33.5%2C50m-33.5-50%2C67%2C25m-0.5%2C0%2C0%2C75m-66.5-75%2C67-25m-33.5%2C75%2C0%2C25m0-100%2C0%2C50%22%2F%3E%0A%3C%2Fsvg%3E%0A') repeat;\r\n  -webkit-user-select: none;\r\n  -khtml-user-select: none;\r\n  -moz-user-select: none;\r\n  -o-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  outline: 0;\r\n  line-height: 1.4;\r\n  contain: content;\r\n}\r\n\r\n.pnlm-container * {\r\n  box-sizing: content-box;\r\n  font-family: source sans pro, ui-sans-serif;\r\n}\r\n\r\n.pnlm-ui {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 1;\r\n}\r\n\r\n.pnlm-custom {\r\n  cursor: url("data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAUAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQFBgYGBzc1ND4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAADwAAABEAAAAKAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAACAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAcAAAAJAAAABkAAAAMAAAABQAAAAMAAAABAAAAAwAAAAUAAAAHAAAACgAAAAsAAAANAAAACwAAAAkAAAAGAAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAB8AAAAvAAAAKQAAAB8AAAASAAAADAAAAAcAAAALAAAAEwAAABoAAAAeAAAAIQAAACIAAAAgAAAAHQAAABYAAAAOAAAABgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNQTs9TUE7QAAAAFgAAACsAAAAzAAAAMwAAACcAAAAeAAAAGAAAAB8AAAArAAAANQAAADoAAAA8AAAAPQAAADsAAAA4AAAALwAAACMAAAATAAAACAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjM9TUE7RAAAAHgAAADEAAAA+AAAAOwAAADUAAAAzAAAAOSSA3/8kgN//JIDf/ySA3/8kgN//AAAATQAAAEsAAABGAAAAOwAAACgAAAAVAAAABwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjNBTUE7SU1BO1wAAAD4AAABHAAAARyGR5/8jhuX/I4Lg/ySA3v8kgN//JIDf/yWD4/8hkef/IZHn/wAAAFEAAABLAAAAPgAAACcAAAARAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkI6Mz5COjNFTUE7VU1BO2iGR5/8gj+T/IZHn/yGQ5/8gj+b/IYvk/yKI4v8jg+H/JYDf/yWB4P8kf93/IZHn/wAAAFMAAABNAAAAOgAAACAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQjozPkI6M0JCOjNUcmOr/HJ3u/xye7v8cn+//HJ7u/x2b7P8dmOr/H5Tp/yGO5f8iieP/I4Lg/ySA4P8hkef/IZHn/wAAAFMAAABJAAAALgAAABQAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQjozRHqf2/xmm8f8YqfP/F6z0/xet9f8XrPX/GKnz/xql8f8boO//HJrr/x+U6f8hjOX/IoTh/yWA3v8jfdv/AAECYQAAAFEAAAA6AAAAHgAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARaZ1uQUsPb/EbT4/xC4+v8Pu/v/D7v7/w+6+/8Rt/r/ErL4/xWs9f8apfH/HJ7v/x6W6v8gjeX/IoXh/ySA3/8hkef/AAAAVAAAAEMAAAAnAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt1vj/EbP2/w68+/8Mvfz/Db79/w6+/f8Ovv3/Dr7+/w2+/v8Nvvz/D7r6/xOy9/8YqfT/G6Hv/x6W6v8hjeX/I4Th/yGR5/8AAABVAAAASQAAAC0AAAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+27fMNvv3/Dr79/w3B/f8Owfz/D8H8/w/B/f8Pwfz/DsD8/w2//f8Ovf3/DLz8/xG0+f8XqvT/G6Dv/x6V6f8hi+T/I4Hf/yGR5/8AAABNAAAAMQAAABUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADbz6/w2//f8Pwfv/D8P9/w/F/f8Pxf3/Ecb9/xHG/f8Pw/z/D8L8/w7B/P8Nvfz/Db38/xK0+P8ZqPL/G53u/yCR6P8ihuL/IZHn/wAAAE4AAAA1AAAAGgAAAAUAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3W+P8Nv/7/DsH8/xDF/P8Qx/v/Esn7/xLL+/8SzP3/Ecv9/xDI+/8Rxvz/D8P9/w/B/f8Ovf3/Dbz7/xSw9v8bpPD/Hpfq/yGM5P8hkef/AAAAUAAAAD0AAAAmAAAAEgAAAAoAAAAEAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAEs38/w/B/P8PxPz/EMj7/xLL+/8Tz/v/FNH6/xTR+v8U0Pr/Es77/xLK/P8Rx/z/FK7x/yB71v8ZkOP/ELn7/xip8/8dne7/IJDn/yGR5/8AAABSAAAASAAAADoAAAAqAAAAHQAAABEAAAAIAAAAAgAAAAAAAAAAAAAAAAAAAAASzfz/EMP9/xDH+/8RzPv/FND5/xXV+v8Z2fv/Gdr6/xfX+v8U0/r/E9H8/yCN4P8ihtv/I3vW/yVwz/8nYMj/FLD2/xyg7/8elOf/IZHn/wAAAFQAAABRAAAASwAAAEIAAAA2AAAAJwAAABUAAAAIAAAAAQAAAAAAAAAAAAAAABLN/P8Qxfv/Ecr7/xPP+/8V1fr/G9v6/x7h+P8j4vn/Hd/5/xjY+f8XrPH/HJ7r/x6T5P8hid3/In/Y/yVz0f8jf9v/I4vj/yKL4/8kkef/J5j0/iGR5/8AAABUAAAAUAAAAEoAAAA+AAAAKQAAABMAAAAEAAAAAAAAAAAAAAAALdb4/xDF/P8Sy/v/FNH6/xjY+v8d3/n/e+v5/6Hv+v9M5fn/HN75/w+5+v8VrvP/G6Ht/x2W5/8hjOL/Iozk/yyf7P9Cwfz/Qr37/0G8+/9Cuvv/Q7v7/0a69/5Du/r/AAAAUgAAAE0AAAA8AAAAIgAAAAsAAAAAAAAAAAAAAAAAAAAAEMP6/xLL+/8U0fr/GNj6/yHh+f+W7vr/zfb7/2bo+v8c3vr/EMv7/w2+/P8Tsvb/Iovk/yGL4/9Bxfv/QMH7/0DB+/9BwPv/Qb78/0K+/P9CvPv/Q737/0O7+v9Du/r/AAAAUwAAAEoAAAAuAAAAEwAAAAAAAAAAAAAAAAAAAAASzfz/Esv7/xTP+f8W1vr/HN36/zbk+v9a5/n/IOL4/xnZ+v8Y3vn/EdD6/xyb6v8hiuP/Psf7/z/F+v8/w/v/QML7/0HB+/9Awfv/QcD8/0G+/f9Bvvz/Qrz7/0O7+f9Du/r/AAAAUgAAADYAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAARxO7zE877/xTS+v8X1/r/Gtv6/xzc+v8a2vv/Ftb6/xPP+v8a4vn/IYrk/zzM/P88x/z/Psb6/z7F+v8/xPv/QML6/0DC+v9BwPv/QcD7/0G//P9Bvv3/Qr38/0O7+v8AAABUAAAAOAAAABwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAQt9nfE8/7/y3W+P8V1fv/FdX6/xXU+v8U0Pr/Esv7/xyi7P8vr/D/Osv7/zzK/P88yPz/Pcj7/z7G+/8+xPr/PsT6/0DC+v9Bwvv/QMH7/0HA+/9Bv/z/RMP8/wAAAFMAAAA3AAAAGwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt1vj/EtD8/y3W+P8Tzvv/Es38/xHK+/8Rx/v/IYvk/zjO+/85zfv/Osv7/zrL+/87yfv/PMf7/z7H/P89xfr/QMX6/0DD+v9Bwvr/QcH7/0HB/P9Bv/n/AAEBVwAAADEAAAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALdb4/xLN/P8Szfz/EMPv8w2w3OEjjuX/NtD6/zbO/P85zfv/Ocz6/znL+v87yvv/Osn8/zzH/P8+xvv/PsX6/z/F+v9Aw/v/QMP6/0LH/P8AAABKAAAAJwAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAASSX2+000fr/NdH8/zbQ+/84zfv/Oc36/znL+v86y/v/O8n7/zvI+/89x/z/Psb7/z7E+v8/xPv/Pbbi8AAAADQAAAAaAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIYnH3DPT+/8z0vv/NdH8/zbP+/82z/v/OM36/znM+v86y/r/Osr7/zvJ+/88yPz/Pcf7/z7F+v9Du/r/AAAAIQAAAA0AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhicfcMNX5/zPT+/8z0/z/NNH8/zTR/P82z/z/N877/znN+v85y/r/Osv6/zvK+/87yfv/Pcf3/C3W+P8AAAARAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv2vn/L9b7/zLV/P8z1Pz/NNL8/zXR/P820fz/Ns/8/zjO+/86zfv/Ocv6/znJ+f9Du/r/AAAADwAAAAYAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3W+P8t1vj/Ltf8/zHW/P8z1Pv/M9T8/zPS/P810fv/NtD8/zbO+/84yvj/Q7v6/wAAAA0AAAAEAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEO7+v9Du/r/Ltj7/y/X+/8x1fz/M9T8/zTT+/800vr/NdX3+UO7+v8AAAAHAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDu/r/LNn6/y/Y+/8w1fv/Q7v6/y3W+P8AAAAGAAAABAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////z////8fwf//hwB//8AAP//AAB//4AAf/+AAD//AAA//wAAH/8AAB/+AAAf/gAAH/4AAB/+AAAH/gAAAf8AAAD/AAAAf4AAAH/AAAB/4AAAf/gAAH//wAB//8AAf//AAH//4AD//+AB///wA////A/8="), auto;\r\n}\r\n\r\n.pnlm-grab {\r\n  cursor: grab;\r\n  cursor: ${"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2226%22%20width%3D%2226%22%3E%0A%3Cpath%20stroke%3D%22%23000%22%20stroke-width%3D%221px%22%20fill%3D%22%23fff%22%20d%3D%22m15.3%2020.5s6.38-6.73%204.64-8.24-3.47%201.01-3.47%201.01%203.61-5.72%201.41-6.49c-2.2-0.769-3.33%204.36-3.33%204.36s0.873-5.76-1.06-5.76-1.58%205.39-1.58%205.39-0.574-4.59-2.18-4.12c-1.61%200.468-0.572%205.51-0.572%205.51s-1.58-4.89-2.93-3.79c-1.35%201.11%200.258%205.25%200.572%206.62%200.836%202.43%202.03%202.94%202.17%205.55%22%2F%3E%0A%3C%2Fsvg%3E%0A') 12 8, default"}\r\n}\r\n\r\n.pnlm-grabbing {\r\n  cursor: grabbing;\r\n  cursor: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2226%22%20width%3D%2226%22%3E%0A%3Cpath%20stroke%3D%22%23000%22%20stroke-width%3D%221px%22%20fill%3D%22%23fff%22%20d%3D%22m15.3%2020.5s5.07-5.29%203.77-6.74c-1.31-1.45-2.53%200.14-2.53%200.14s2.74-3.29%200.535-4.06c-2.2-0.769-2.52%201.3-2.52%201.3s0.81-2.13-1.12-2.13-1.52%201.77-1.52%201.77-0.261-1.59-1.87-1.12c-1.61%200.468-0.874%202.17-0.874%202.17s-0.651-1.55-2-0.445c-1.35%201.11-0.68%202.25-0.365%203.62%200.836%202.43%202.03%202.94%202.17%205.55%22%2F%3E%0A%3C%2Fsvg%3E%0A') 12 8, default\r\n}\r\n\r\n.pnlm-sprite {\r\n  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2226%22%20height%3D%22208%22%3E%0A%3Ccircle%20fill-opacity%3D%22.78%22%20cy%3D%22117%22%20cx%3D%2213%22%20r%3D%2211%22%20fill%3D%22%23fff%22%2F%3E%0A%3Ccircle%20fill-opacity%3D%22.78%22%20cy%3D%22143%22%20cx%3D%2213%22%20r%3D%2211%22%20fill%3D%22%23fff%22%2F%3E%0A%3Ccircle%20cy%3D%22169%22%20cx%3D%2213%22%20r%3D%227%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%2F%3E%0A%3Ccircle%20cy%3D%22195%22%20cx%3D%2213%22%20r%3D%227%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%2F%3E%0A%3Ccircle%20cx%3D%2213%22%20cy%3D%22195%22%20r%3D%222.5%22%2F%3E%0A%3Cpath%20d%3D%22m5%2083v6h2v-4h4v-2zm10%200v2h4v4h2v-6zm-5%205v6h6v-6zm-5%205v6h6v-2h-4v-4zm14%200v4h-4v2h6v-6z%22%2F%3E%0A%3Cpath%20d%3D%22m13%20110a7%207%200%200%200%20-7%207%207%207%200%200%200%207%207%207%207%200%200%200%207%20-7%207%207%200%200%200%20-7%20-7zm-1%203h2v2h-2zm0%203h2v5h-2z%22%2F%3E%0A%3Cpath%20d%3D%22m5%2057v6h2v-4h4v-2zm10%200v2h4v4h2v-6zm-10%2010v6h6v-2h-4v-4zm14%200v4h-4v2h6v-6z%22%2F%3E%0A%3Cpath%20d%3D%22m17%2038v2h-8v-2z%22%2F%3E%0A%3Cpath%20d%3D%22m12%209v3h-3v2h3v3h2v-3h3v-2h-3v-3z%22%2F%3E%0A%3Cpath%20d%3D%22m13%20136-6.125%206.125h4.375v7.875h3.5v-7.875h4.375z%22%2F%3E%0A%3Cpath%20d%3D%22m10.428%20173.33v-5.77l5-2.89v5.77zm1-1.73%203-1.73-3.001-1.74z%22%2F%3E%0A%3C%2Fsvg%3E%0A')\r\n}\r\n\r\n.pnlm-container:-moz-full-screen {\r\n  height: 100% !important;\r\n  width: 100% !important;\r\n  position: static !important;\r\n}\r\n\r\n.pnlm-container:-webkit-full-screen {\r\n  height: 100% !important;\r\n  width: 100% !important;\r\n  position: static !important;\r\n}\r\n\r\n.pnlm-container:-ms-fullscreen {\r\n  height: 100% !important;\r\n  width: 100% !important;\r\n  position: static !important;\r\n}\r\n\r\n.pnlm-container:fullscreen {\r\n  height: 100% !important;\r\n  width: 100% !important;\r\n  position: static !important;\r\n}\r\n\r\n.pnlm-render-container {\r\n  cursor: inherit;\r\n\r\n  /* Fix display bug in Safari 7 */\r\n  position: absolute;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.pnlm-controls {\r\n  margin-top: 4px;\r\n  background-color: #fff;\r\n  border: 1px solid #999;\r\n  border-color: rgba(0, 0, 0, 0.4);\r\n  border-radius: 3px;\r\n  cursor: pointer;\r\n  z-index: 2;\r\n  /* Fix Safari fullscreen bug */\r\n  -webkit-transform: translateZ(9999px);\r\n  transform: translateZ(9999px);\r\n}\r\n\r\n.pnlm-control:hover {\r\n  background-color: #f8f8f8;\r\n}\r\n\r\n.pnlm-controls-container {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 4px;\r\n  z-index: 1;\r\n}\r\n\r\n.pnlm-zoom-controls {\r\n  width: 26px;\r\n  height: 52px;\r\n}\r\n\r\n.pnlm-zoom-in {\r\n  width: 100%;\r\n  height: 50%;\r\n  position: absolute;\r\n  top: 0;\r\n  border-radius: 3px 3px 0 0;\r\n}\r\n\r\n.pnlm-zoom-out {\r\n  width: 100%;\r\n  height: 50%;\r\n  position: absolute;\r\n  bottom: 0;\r\n  background-position: 0 -26px;\r\n  border-top: 1px solid #ddd;\r\n  border-top-color: rgba(0, 0, 0, 0.10);\r\n  border-radius: 0 0 3px 3px;\r\n}\r\n\r\n.pnlm-fullscreen-toggle-button,\r\n.pnlm-orientation-button,\r\n.pnlm-hot-spot-debug-indicator {\r\n  width: 26px;\r\n  height: 26px;\r\n}\r\n\r\n.pnlm-hot-spot-debug-indicator {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 26px;\r\n  height: 26px;\r\n  margin: -13px 0 0 -13px;\r\n  background-color: rgba(255, 255, 255, 0.5);\r\n  border-radius: 13px;\r\n  display: none;\r\n}\r\n\r\n.pnlm-orientation-button-inactive {\r\n  background-position: 0 -156px;\r\n}\r\n\r\n.pnlm-orientation-button-active {\r\n  background-position: 0 -182px;\r\n}\r\n\r\n.pnlm-fullscreen-toggle-button-inactive {\r\n  background-position: 0 -52px;\r\n}\r\n\r\n.pnlm-fullscreen-toggle-button-active {\r\n  background-position: 0 -78px;\r\n}\r\n\r\n.pnlm-panorama-info {\r\n  position: absolute;\r\n  bottom: 4px;\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  border-radius: 0 3px 3px 0;\r\n  padding-right: 10px;\r\n  color: #fff;\r\n  text-align: left;\r\n  display: none;\r\n  z-index: 2;\r\n  /* Fix Safari fullscreen bug */\r\n  -webkit-transform: translateZ(9999px);\r\n  transform: translateZ(9999px);\r\n}\r\n\r\n.pnlm-title-box {\r\n  position: relative;\r\n  font-size: 20px;\r\n  display: table;\r\n  padding-left: 5px;\r\n  margin-bottom: 3px;\r\n}\r\n\r\n.pnlm-description-box {\r\n  position: relative;\r\n  font-size: 18px;\r\n  display: table;\r\n  padding-left: 5px;\r\n  margin-bottom: 3px;\r\n}\r\n\r\n.pnlm-author-box {\r\n  position: relative;\r\n  font-size: 12px;\r\n  display: table;\r\n  padding-left: 5px;\r\n}\r\n\r\n.pnlm-load-box {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 200px;\r\n  height: 150px;\r\n  margin: -75px 0 0 -100px;\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  border-radius: 3px;\r\n  text-align: center;\r\n  font-size: 20px;\r\n  display: none;\r\n  color: #fff;\r\n}\r\n\r\n.pnlm-load-box p {\r\n  margin: 20px 0;\r\n}\r\n\r\n.pnlm-lbox {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 20px;\r\n  height: 20px;\r\n  margin: -10px 0 0 -10px;\r\n  display: none;\r\n}\r\n\r\n.pnlm-loading {\r\n  animation-duration: 1.5s;\r\n  -webkit-animation-duration: 1.5s;\r\n  animation-name: pnlm-mv;\r\n  -webkit-animation-name: pnlm-mv;\r\n  animation-iteration-count: infinite;\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-timing-function: linear;\r\n  -webkit-animation-timing-function: linear;\r\n  height: 10px;\r\n  width: 10px;\r\n  background-color: #fff;\r\n  position: relative;\r\n}\r\n\r\n@keyframes pnlm-mv {\r\n  from {\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n\r\n  25% {\r\n    left: 10px;\r\n    top: 0;\r\n  }\r\n\r\n  50% {\r\n    left: 10px;\r\n    top: 10px;\r\n  }\r\n\r\n  75% {\r\n    left: 0;\r\n    top: 10px;\r\n  }\r\n\r\n  to {\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n@-webkit-keyframes pnlm-mv {\r\n  from {\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n\r\n  25% {\r\n    left: 10px;\r\n    top: 0;\r\n  }\r\n\r\n  50% {\r\n    left: 10px;\r\n    top: 10px;\r\n  }\r\n\r\n  75% {\r\n    left: 0;\r\n    top: 10px;\r\n  }\r\n\r\n  to {\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n}\r\n\r\n.pnlm-load-button {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 200px;\r\n  height: 100px;\r\n  margin: -50px 0 0 -100px;\r\n  background-color: rgba(0, 0, 0, .7);\r\n  border-radius: 3px;\r\n  text-align: center;\r\n  font-size: 20px;\r\n  display: table;\r\n  color: #fff;\r\n  cursor: pointer;\r\n}\r\n\r\n.pnlm-load-button:hover {\r\n  background-color: rgba(0, 0, 0, .8);\r\n}\r\n\r\n.pnlm-load-button p {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n}\r\n\r\n.pnlm-info-box {\r\n  font-size: 15px;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 200px;\r\n  height: 150px;\r\n  margin: -75px 0 0 -100px;\r\n  background-color: #000;\r\n  border-radius: 3px;\r\n  display: table;\r\n  text-align: center;\r\n  color: #fff;\r\n  table-layout: fixed;\r\n}\r\n\r\n.pnlm-info-box a,\r\n.pnlm-author-box a {\r\n  color: #fff;\r\n  word-wrap: break-word;\r\n  overflow-wrap: break-word;\r\n}\r\n\r\n.pnlm-info-box p {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n  padding: 0 5px 0 5px;\r\n}\r\n\r\n.pnlm-error-msg {\r\n  display: none;\r\n}\r\n\r\n.pnlm-about-msg {\r\n  font-size: 11px;\r\n  line-height: 11px;\r\n  color: #fff;\r\n  padding: 5px 8px 5px 8px;\r\n  background: rgba(0, 0, 0, 0.7);\r\n  border-radius: 3px;\r\n  position: absolute;\r\n  top: 50px;\r\n  left: 50px;\r\n  display: none;\r\n  opacity: 0;\r\n  -moz-transition: opacity .3s ease-in-out;\r\n  -webkit-transition: opacity .3s ease-in-out;\r\n  -o-transition: opacity .3s ease-in-out;\r\n  -ms-transition: opacity .3s ease-in-out;\r\n  transition: opacity .3s ease-in-out;\r\n  z-index: 1;\r\n}\r\n\r\n.pnlm-about-msg a:link,\r\n.pnlm-about-msg a:visited {\r\n  color: #fff;\r\n}\r\n\r\n.pnlm-about-msg a:hover,\r\n.pnlm-about-msg a:active {\r\n  color: #eee;\r\n}\r\n\r\n.pnlm-hotspot-base {\r\n  position: absolute;\r\n  visibility: hidden;\r\n  cursor: default;\r\n  vertical-align: middle;\r\n  top: 0;\r\n  z-index: 1;\r\n}\r\n\r\n.pnlm-hotspot {\r\n  height: 26px;\r\n  width: 26px;\r\n  border-radius: 13px;\r\n}\r\n\r\n.pnlm-hotspot:hover {\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.pnlm-hotspot.pnlm-info {\r\n  background-position: 0 -104px;\r\n}\r\n\r\n.pnlm-hotspot.pnlm-scene {\r\n  background-position: 0 -130px;\r\n}\r\n\r\ndiv.pnlm-tooltip span {\r\n  visibility: hidden;\r\n  position: absolute;\r\n  border-radius: 3px;\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  color: #fff;\r\n  text-align: center;\r\n  max-width: 200px;\r\n  padding: 5px 10px;\r\n  margin-left: -220px;\r\n  cursor: default;\r\n}\r\n\r\ndiv.pnlm-tooltip:hover span {\r\n  visibility: visible;\r\n}\r\n\r\ndiv.pnlm-tooltip:hover span:after {\r\n  content: '';\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  border-width: 10px;\r\n  border-style: solid;\r\n  border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;\r\n  bottom: -20px;\r\n  left: -10px;\r\n  margin: 0 50%;\r\n}\r\n\r\n.pnlm-compass {\r\n  position: absolute;\r\n  width: 50px;\r\n  height: 50px;\r\n  right: 4px;\r\n  bottom: 4px;\r\n  border-radius: 25px;\r\n  background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2250%22%20width%3D%2250%22%3E%0A%3Cpath%20d%3D%22m24.5078%206-3.2578%2018h7.5l-3.25781-18h-0.984376zm-3.2578%2020%203.2578%2018h0.9844l3.2578-18h-7.5zm1.19531%200.9941h5.10938l-2.5547%2014.1075-2.5547-14.1075z%22%2F%3E%0A%3C%2Fsvg%3E%0A');\r\n  cursor: default;\r\n  display: none;\r\n}\r\n\r\n.pnlm-world {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 50%;\r\n}\r\n\r\n.pnlm-face {\r\n  position: absolute;\r\n  -webkit-transform-origin: 0 0 0;\r\n  transform-origin: 0 0 0;\r\n}\r\n\r\n.pnlm-dragfix,\r\n.pnlm-preview-img {\r\n  position: absolute;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.pnlm-preview-img {\r\n  background-size: cover;\r\n  background-position: center;\r\n}\r\n\r\n.pnlm-lbar {\r\n  width: 150px;\r\n  margin: 0 auto;\r\n  border: #fff 1px solid;\r\n  height: 6px;\r\n}\r\n\r\n.pnlm-lbar-fill {\r\n  background: #fff;\r\n  height: 100%;\r\n  width: 0;\r\n}\r\n\r\n.pnlm-lmsg {\r\n  font-size: 12px;\r\n}\r\n\r\n.pnlm-fade-img {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.pnlm-pointer {\r\n  cursor: pointer;\r\n}\r\n`;
styleInject(css_248z);

var myPannellum = null;

var ReactPannellum = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ReactPannellum, _React$Component);

  var _super = _createSuper(ReactPannellum);

  function ReactPannellum() {
    var _this;

    _classCallCheck(this, ReactPannellum);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      imageSource: "",
      equirectangularOptions: {},
      cubeMap: [],
      multiRes: {},
    };

    _this.init = function () {
      var _this$state = _this.state,
        imageSource = _this$state.imageSource,
        equirectangularOptions = _this$state.equirectangularOptions,
        cubeMap = _this$state.cubeMap,
        multiRes = _this$state.multiRes;
      var _this$props = _this.props,
        sceneId = _this$props.sceneId,
        config = _this$props.config,
        type = _this$props.type;
      myPannellum = pannellum.viewer(_this.props.id, {
        default: {
          firstScene: sceneId,
        },
        scenes: _defineProperty(
          {},
          sceneId,
          _objectSpread2(
            _objectSpread2(
              _objectSpread2(
                _objectSpread2(
                  _objectSpread2(
                    _objectSpread2({}, configs.panoramaConfigs),
                    configs.equirectangularOptions
                  ),
                  configs.uiText
                ),
                config
              ),
              {},
              {
                type: type,
                imageSource: imageSource,
              },
              equirectangularOptions
            ),
            {},
            {
              cubeMap: cubeMap,
              multiRes: multiRes,
            }
          )
        ),
      });

      myPannellum &&
        myPannellum.on("mousedown", function (event) {
          return _this.props.onMouseDown(event);
        });

      myPannellum &&
        myPannellum.on("mouseup", function (event) {
          return _this.props.onMouseUp(event);
        });

      myPannellum &&
        myPannellum.on("mousemove", function (event) {
          return _this.props.onMouseMove(event);
        });

      myPannellum &&
        myPannellum.on("load", function () {
          return myPannellum.sceneLoadListener();
        });

      // _this.props.onPanoramaLoaded &&
      //   myPannellum.on("load", function () {
      //     return _this.props.onPanoramaLoaded();
      //   });
    };

    return _this;
  }

  _createClass(
    ReactPannellum,
    [
      {
        key: "initPanalleum",
        value: function initPanalleum() {
          var _this2 = this;

          var _this$props2 = this.props,
            imageSource = _this$props2.imageSource,
            type = _this$props2.type,
            cubeMap = _this$props2.cubeMap,
            multiRes = _this$props2.multiRes,
            equirectangularOptions = _this$props2.equirectangularOptions;

          switch (type) {
            case "equirectangular":
              this.setState(
                {
                  imageSource: imageSource,
                  equirectangularOptions: equirectangularOptions,
                  cubeMap: [],
                },
                function () {
                  return _this2.init();
                }
              );
              break;

            case "cubemap":
              this.setState(
                {
                  cubeMap: cubeMap,
                  imageSource: "",
                },
                function () {
                  return _this2.init();
                }
              );
              break;

            case "multires":
              this.setState(
                {
                  cubeMap: [],
                  imageSource: "",
                  multiRes: multiRes,
                },
                function () {
                  return _this2.init();
                }
              );
              break;
          }
        },
      },
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.initPanalleum();
        },
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          myPannellum &&
            this.props.onPanoramaLoaded &&
            myPannellum.off("load", this.props.onPanoramaLoaded);
        },
      },
      {
        key: "render",
        value: function render() {
          var _this$props3 = this.props,
            style = _this$props3.style,
            className = _this$props3.className,
            id = _this$props3.id,
            children = _this$props3.children;
          return /*#__PURE__*/ React__default["default"].createElement("div", {
            id: id,
            style: style,
            className: className,
            children: children,
          });
        },
      },
    ],
    [
      {
        key: "isLoaded",
        value: function isLoaded() {
          return myPannellum && myPannellum.isLoaded();
        },
      },
      {
        key: "getPitch",
        value: function getPitch() {
          return myPannellum && myPannellum.getPitch();
        },
      },
      {
        key: "setPitch",
        value: function setPitch(pitch) {
          var animated =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : 1000;
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          var callbackArgs = arguments.length > 3 ? arguments[3] : undefined;

          if (myPannellum) {
            myPannellum.setPitch(pitch, animated, callback, callbackArgs);
          }
        },
      },
      {
        key: "getPitchBounds",
        value: function getPitchBounds() {
          return myPannellum && myPannellum.getPitchBounds();
        },
      },
      {
        key: "setPitchBounds",
        value: function setPitchBounds(bounds) {
          if (myPannellum) {
            myPannellum.setPitchBounds(bounds);
          }
        },
      },
      {
        key: "getYaw",
        value: function getYaw() {
          return myPannellum && myPannellum.getYaw();
        },
      },
      {
        key: "setYaw",
        value: function setYaw(yaw) {
          var animated =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : 1000;
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          var callbackArgs = arguments.length > 3 ? arguments[3] : undefined;

          if (myPannellum) {
            myPannellum.setYaw(yaw, animated, callback, callbackArgs);
          }
        },
      },
      {
        key: "getYawBounds",
        value: function getYawBounds() {
          return myPannellum && myPannellum.getYawBounds();
        },
      },
      {
        key: "setYawBounds",
        value: function setYawBounds(bounds) {
          myPromise(myPannellum, {
            bounds: bounds,
          })
            .then(function (_ref) {
              var bounds = _ref.bounds;
              myPannellum.setYawBounds(bounds);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "getHfov",
        value: function getHfov() {
          return myPannellum && myPannellum.getHfov();
        },
      },
      {
        key: "setHfov",
        value: function setHfov(hfov) {
          var animated =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : 1000;
          var callback = arguments.length > 2 ? arguments[2] : undefined;
          var callbackArgs = arguments.length > 3 ? arguments[3] : undefined;

          if (myPannellum) {
            myPannellum.setHfov(hfov, animated, callback, callbackArgs);
          }
        },
      },
      {
        key: "getHfovBounds",
        value: function getHfovBounds() {
          return myPannellum && myPannellum.getHfovBounds();
        },
      },
      {
        key: "setHfovBounds",
        value: function setHfovBounds(bounds) {
          myPromise(myPannellum, {
            bounds: bounds,
          })
            .then(function (_ref2) {
              var bounds = _ref2.bounds;
              myPannellum.setHfovBounds(bounds);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "lookAt",
        value: function lookAt(pitch, yaw, hfov) {
          var animated =
            arguments.length > 3 && arguments[3] !== undefined
              ? arguments[3]
              : 1000;
          var callback = arguments.length > 4 ? arguments[4] : undefined;
          var callbackArgs = arguments.length > 5 ? arguments[5] : undefined;

          if (myPannellum) {
            myPannellum.lookAt(
              pitch,
              yaw,
              hfov,
              animated,
              callback,
              callbackArgs
            );
          }
        },
      },
      {
        key: "getNorthOffset",
        value: function getNorthOffset() {
          return myPannellum && myPannellum.getNorthOffset();
        },
      },
      {
        key: "setNorthOffset",
        value: function setNorthOffset(heading) {
          myPromise(myPannellum, {
            heading: heading,
          })
            .then(function (_ref3) {
              var heading = _ref3.heading;
              myPannellum.setNorthOffset(heading);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "getHorizonRoll",
        value: function getHorizonRoll() {
          return myPannellum && myPannellum.getHorizonRoll();
        },
      },
      {
        key: "setHorizonRoll",
        value: function setHorizonRoll(roll) {
          myPromise(myPannellum, {
            roll: roll,
          })
            .then(function (_ref4) {
              var roll = _ref4.roll;
              myPannellum.setHorizonRoll(roll);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "getHorizonPitch",
        value: function getHorizonPitch() {
          return myPannellum && myPannellum.getHorizonPitch();
        },
      },
      {
        key: "setHorizonPitch",
        value: function setHorizonPitch(pitch) {
          myPromise(myPannellum, {
            pitch: pitch,
          })
            .then(function (_ref5) {
              var pitch = _ref5.pitch;
              myPannellum.setHorizonPitch(pitch);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "startAutoRotate",
        value: function startAutoRotate(speed, pitch) {
          myPromise(myPannellum, {
            pitch: pitch,
          })
            .then(function (_ref6) {
              var pitch = _ref6.pitch;
              myPannellum.startAutoRotate(speed, pitch);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "stopAutoRotate",
        value: function stopAutoRotate() {
          if (myPannellum) {
            myPannellum.stopAutoRotate();
          }
        },
      },
      {
        key: "showCompass",
        value: function showCompass(value) {
          myPromise(myPannellum, {})
            .then(function () {
              myPannellum.showCompass(value);
            })
            ["catch"](function (err) {
              console.log(err);
            });
        },
      },
      {
        key: "changeMouseCursor",
        value: function changeMouseCursor(event) {
          return myPannellum && myPannellum.changeMouseCursor(event);
        },
      },
      {
        key: "mouseEventToCoords",
        value: function mouseEventToCoords(event) {
          return myPannellum && myPannellum.mouseEventToCoords(event);
        },
      },
      {
        key: "addScene",
        value: function addScene(sceneId, config, callback) {
          if (sceneId && sceneId !== "" && config && config !== {}) {
            myPromise(myPannellum, {
              sceneId: sceneId,
              config: config,
              callback: callback,
            })
              .then(function (_ref7) {
                var sceneId = _ref7.sceneId,
                  config = _ref7.config,
                  callback = _ref7.callback;
                myPannellum.addScene(sceneId, config);
                callback && callback();
              })
              ["catch"](function (err) {
                console.log(err);
              });
          } else {
            console.log(
              "sceneId cannot be empty and config.imageSource cannot be empty!!"
            );
          }
        },
      },
      {
        key: "getCurrentScene",
        value: function getCurrentScene() {
          return myPannellum && myPannellum.getScene();
        },
      },
      {
        key: "getAllScenes",
        value: function getAllScenes() {
          return myPannellum && myPannellum.getAllScenes();
        },
      },
      {
        key: "removeScene",
        value: function removeScene(sceneId, callback) {
          if (sceneId && sceneId !== "") {
            myPromise(myPannellum, {
              sceneId: sceneId,
            })
              .then(function (_ref8) {
                var sceneId = _ref8.sceneId;
                myPannellum.removeScene(sceneId);
                callback && callback();
              })
              ["catch"](function (err) {
                console.log(err);
              });
          } else {
            console.log("sceneId cannot be empty");
          }
        },
      },
      {
        key: "loadScene",
        value: function loadScene(
          sceneId,
          targetPitch,
          targetYaw,
          targetHfov,
          fadeDone
        ) {
          if (myPannellum && sceneId && sceneId !== "") {
            myPannellum.loadScene(
              sceneId,
              targetPitch,
              targetYaw,
              targetHfov,
              fadeDone
            );
          }
        },
      },
      {
        key: "toggleFullscreen",
        value: function toggleFullscreen() {
          return myPannellum && myPannellum.toggleFullscreen();
        },
      },
      {
        key: "getConfig",
        value: function getConfig() {
          return myPannellum && myPannellum.getConfig();
        },
      },
      {
        key: "getContainer",
        value: function getContainer() {
          return myPannellum && myPannellum.getContainer();
        },
      },
      {
        key: "addHotSpot",
        value: function addHotSpot(hotspot, sceneId) {
          if (hotspot !== {}) {
            myPromise(myPannellum, {
              hotspot: hotspot,
              sceneId: sceneId,
            })
              .then(function (_ref9) {
                var hotspot = _ref9.hotspot,
                  sceneId = _ref9.sceneId;
                myPannellum.addHotSpot(hotspot, sceneId);
              })
              ["catch"](function (err) {
                console.log(err);
              });
          } else {
            console.log(
              "hotspot cannot be empty, please check hotspot elements needed in document: config props `hotSpots`."
            );
          }
        },
      },
      {
        key: "removeHotSpot",
        value: function removeHotSpot(hotSpotId, sceneId) {
          if (hotSpotId !== "") {
            myPromise(myPannellum, {
              hotSpotId: hotSpotId,
              sceneId: sceneId,
            })
              .then(function (_ref10) {
                var hotSpotId = _ref10.hotSpotId,
                  sceneId = _ref10.sceneId;
                myPannellum.removeHotSpot(hotSpotId, sceneId);
              })
              ["catch"](function (err) {
                console.log(err);
              });
          } else {
            console.log("hotspotId cannot be empty!!");
          }
        },
      },
      {
        key: "destroy",
        value: function destroy() {
          return myPannellum && myPannellum.destroy();
        },
      },
      {
        key: "stopMovement",
        value: function stopMovement() {
          return myPannellum && myPannellum.stopMovement();
        },
      },
      {
        key: "resize",
        value: function resize() {
          return myPannellum && myPannellum.resize();
        },
      },
      {
        key: "isOrientationSupported",
        value: function isOrientationSupported() {
          return myPannellum && myPannellum.isOrientationSupported();
        },
      },
      {
        key: "stopOrientation",
        value: function stopOrientation() {
          return myPannellum && myPannellum.stopOrientation();
        },
      },
      {
        key: "startOrientation",
        value: function startOrientation() {
          return myPannellum && myPannellum.startOrientation();
        },
      },
      {
        key: "isOrientationActive",
        value: function isOrientationActive() {
          return myPannellum && myPannellum.isOrientationActive();
        },
      },
      {
        key: "getViewer",
        value: function getViewer() {
          return myPannellum;
        },
      },
    ]
  );

  return ReactPannellum;
})(React__default["default"].Component);

ReactPannellum.propTypes = {
  id: PropTypes__default["default"].string.isRequired,
  sceneId: PropTypes__default["default"].string.isRequired,
  children: PropTypes__default["default"].any,
  type: PropTypes__default["default"].string,
  imageSource: PropTypes__default["default"].string,
  equirectangularOptions: PropTypes__default["default"].shape({}),
  cubeMap: PropTypes__default["default"].arrayOf(
    PropTypes__default["default"].string
  ),
  multiRes: PropTypes__default["default"].shape({
    basePath: PropTypes__default["default"].string,
    path: PropTypes__default["default"].string,
    fallbackPath: PropTypes__default["default"].string,
    extension: PropTypes__default["default"].string,
    tileResolution: PropTypes__default["default"].number,
    maxLevel: PropTypes__default["default"].number,
    cubeResolution: PropTypes__default["default"].number,
  }),
  config: PropTypes__default["default"].shape({}),
  className: PropTypes__default["default"].string,
  style: PropTypes__default["default"].shape({}),
  onPanoramaLoaded: PropTypes__default["default"].func,
  onMouseDown: PropTypes__default["default"].func,
  onMouseUp: PropTypes__default["default"].func,
  onMouseMove: PropTypes__default["default"].func,
};
ReactPannellum.defaultProps = {
  type: "equirectangular",
  imageSource: "",
  equirectangularOptions: {},
  cubeMap: [],
  multiRes: {},
  className: "",
  style: configs.styles,
  config: {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseMove: () => {},
};

export const addScene = ReactPannellum.addScene;
export const getCurrentScene = ReactPannellum.getCurrentScene;
export const getAllScenes = ReactPannellum.getAllScenes;
export const removeScene = ReactPannellum.removeScene;
export const loadScene = ReactPannellum.loadScene;
export const isLoaded = ReactPannellum.isLoaded;
export const getPitch = ReactPannellum.getPitch;
export const setPitch = ReactPannellum.setPitch;
export const getPitchBounds = ReactPannellum.getPitchBounds;
export const setPitchBounds = ReactPannellum.setPitchBounds;
export const getYaw = ReactPannellum.getYaw;
export const setYaw = ReactPannellum.setYaw;
export const getYawBounds = ReactPannellum.getYawBounds;
export const setYawBounds = ReactPannellum.setYawBounds;
export const getHfov = ReactPannellum.getHfov;
export const setHfov = ReactPannellum.setHfov;
export const getHfovBounds = ReactPannellum.getHfovBounds;
export const setHfovBounds = ReactPannellum.setHfovBounds;
export const lookAt = ReactPannellum.lookAt;
export const getNorthOffset = ReactPannellum.getNorthOffset;
export const setNorthOffset = ReactPannellum.setNorthOffset;
export const getHorizonRoll = ReactPannellum.getHorizonRoll;
export const setHorizonRoll = ReactPannellum.setHorizonRoll;
export const getHorizonPitch = ReactPannellum.getHorizonPitch;
export const setHorizonPitch = ReactPannellum.setHorizonPitch;
export const startAutoRotate = ReactPannellum.startAutoRotate;
export const stopAutoRotate = ReactPannellum.stopAutoRotate;
export const mouseEventToCoords = ReactPannellum.mouseEventToCoords;
export const changeMouseCursor = ReactPannellum.changeMouseCursor;
export const showCompass = ReactPannellum.showCompass;
export const toggleFullscreen = ReactPannellum.toggleFullscreen;
export const getConfig = ReactPannellum.getConfig;
export const getContainer = ReactPannellum.getContainer;
export const addHotSpot = ReactPannellum.addHotSpot;
export const removeHotSpot = ReactPannellum.removeHotSpot;
export const destroy = ReactPannellum.destroy;
export const stopMovement = ReactPannellum.stopMovement;
export const resize = ReactPannellum.resize;
export const isOrientationSupported = ReactPannellum.isOrientationSupported;
export const stopOrientation = ReactPannellum.stopOrientation;
export const startOrientation = ReactPannellum.startOrientation;
export const isOrientationActive = ReactPannellum.isOrientationActive;
export const getViewer = ReactPannellum.getViewer;
export default ReactPannellum;

// exports.addHotSpot = addHotSpot;
// exports.addScene = addScene;
// exports.default = ReactPannellum;
// exports.destroy = destroy;
// exports.getAllScenes = getAllScenes;
// exports.getConfig = getConfig;
// exports.getContainer = getContainer;
// exports.getCurrentScene = getCurrentScene;
// exports.getHfov = getHfov;
// exports.getHfovBounds = getHfovBounds;
// exports.getHorizonPitch = getHorizonPitch;
// exports.getHorizonRoll = getHorizonRoll;
// exports.getNorthOffset = getNorthOffset;
// exports.getPitch = getPitch;
// exports.getPitchBounds = getPitchBounds;
// exports.getViewer = getViewer;
// exports.getYaw = getYaw;
// exports.getYawBounds = getYawBounds;
// exports.isLoaded = isLoaded;
// exports.isOrientationActive = isOrientationActive;
// exports.isOrientationSupported = isOrientationSupported;
// exports.loadScene = loadScene;
// exports.lookAt = lookAt;
// exports.mouseEventToCoords = mouseEventToCoords;
// exports.changeMouseCursor = changeMouseCursor;
// exports.removeHotSpot = removeHotSpot;
// exports.removeScene = removeScene;
// exports.resize = resize;
// exports.setHfov = setHfov;
// exports.setHfovBounds = setHfovBounds;
// exports.setHorizonPitch = setHorizonPitch;
// exports.setHorizonRoll = setHorizonRoll;
// exports.setNorthOffset = setNorthOffset;
// exports.setPitch = setPitch;
// exports.setPitchBounds = setPitchBounds;
// exports.setYaw = setYaw;
// exports.setYawBounds = setYawBounds;
// exports.startAutoRotate = startAutoRotate;
// exports.showCompass = showCompass;
// exports.startOrientation = startOrientation;
// exports.stopAutoRotate = stopAutoRotate;
// exports.stopMovement = stopMovement;
// exports.stopOrientation = stopOrientation;
// exports.toggleFullscreen = toggleFullscreen;

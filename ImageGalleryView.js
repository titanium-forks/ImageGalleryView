// Generated by CoffeeScript 1.4.0

/*
	ImageGalleryView, it will accept an array of 'image' objects,
	composed of 'id,small,large'. Optionally you can also pass a 
	headerView and a footerView pretty much like a TableView
	
	Created by @raulriera but heavily inspired by https://github.com/codeboxed/Titanium-Image-Gallery
*/


(function() {
  var ImageGalleryView;

  ImageGalleryView = function(images, headerView, footerView) {
    var createGalleryWindow, createThumbnail, image, isAndroid, onThumbnailTouched, self, _i, _len;
    isAndroid = Titanium.Platform.osname === "android";
    self = Ti.UI.createScrollView({
      top: 0,
      bottom: 0,
      right: -1,
      left: -1,
      contentWidth: Titanium.UI.FILL,
      contentHeight: "auto",
      layout: "horizontal"
    });
    createGalleryWindow = function(currentPhoto) {
      var b, closeButton, i, image, imageWindow, photosView, scrollView, viewsArray;
      if (currentPhoto == null) {
        currentPhoto = 0;
      }
      imageWindow = Titanium.UI.createWindow({
        backgroundColor: '#000',
        tabBarHidden: true,
        navBarHidden: true,
        orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT]
      });
      closeButton = Titanium.UI.createButton({
        backgroundColor: "#55000000",
        backgroundImage: null,
        borderColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        width: '44dp',
        height: '24dp',
        font: {
          fontSize: '11dp'
        },
        color: '#fff',
        title: L("gallery_close"),
        top: '10dp',
        left: '10dp'
      });
      viewsArray = [];
      photosView = Titanium.UI.createScrollableView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        showPagingControl: false,
        currentPage: 0
      });
      i = 0;
      b = images.length;
      while (i < b) {
        image = Ti.UI.createImageView({
          backgroundColor: "#000",
          image: images[i].large,
          width: '100%'
        });
        if (!isAndroid) {
          scrollView = Titanium.UI.createScrollView({
            maxZoomScale: 4,
            minZoomScale: 1
          });
          scrollView.add(image);
        }
        viewsArray.push(isAndroid ? image : scrollView);
        i++;
      }
      photosView.views = viewsArray;
      photosView.currentPage = currentPhoto;
      closeButton.addEventListener("click", function(e) {
        return imageWindow.close();
      });
      imageWindow.add(photosView);
      imageWindow.add(closeButton);
      return imageWindow;
    };
    createThumbnail = function(image) {
      var view;
      return view = Ti.UI.createImageView({
        image: image.small,
        width: '70dp',
        height: '70dp',
        top: '8dp',
        left: '8dp',
        id: image.id
      });
    };
    onThumbnailTouched = function(e) {
      var window;
      if (e.source.id != null) {
        self.fireEvent("thumbnailTouched", {
          image: e.source
        });
        window = createGalleryWindow();
        return window.open();
      }
    };
    self.addEventListener("click", onThumbnailTouched);
    if (headerView) {
      self.add(headerView);
    }
    for (_i = 0, _len = images.length; _i < _len; _i++) {
      image = images[_i];
      self.add(createThumbnail(image));
    }
    if (footerView) {
      self.add(footerView);
    }
    return self;
  };

  module.exports = ImageGalleryView;

}).call(this);
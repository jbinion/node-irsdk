const sandboxed = require('sandboxed-module')

describe('node-irsdk', function () {
  this.slow(500) // sandboxing is slowish

  describe('#init', function () {
    it('instantiates JsIrSdk once', function () {
      const jsIrSdkSpy = sinon.spy()
      const nodeWrapperMock = {}
      const opts = {
        telemetryUpdateInterval: 1,
        sessionInfoUpdateInterval: 2
      }
      const nodeIrSdk = sandboxed.require('./node-irsdk', {
        requires: {
          '../build/Release/IrSdkNodeBindings': nodeWrapperMock,
          './JsIrSdk': jsIrSdkSpy
        }
      })
      nodeIrSdk.init(opts)
      nodeIrSdk.init(opts)
      jsIrSdkSpy.should.have.been.calledWith(nodeWrapperMock, opts)
      jsIrSdkSpy.should.have.been.calledOnce
    })
  })
  describe('#getInstance', function () {
    it('gives JsIrSdk singleton', function () {
      const jsWrapperMock = function () {
        return ++jsWrapperMock.instanceCount
      }
      const nodeWrapperMock = {}
      const nodeIrSdk = sandboxed.require('./node-irsdk', {
        requires: {
          '../build/Release/IrSdkNodeBindings': nodeWrapperMock,
          './JsIrSdk': jsWrapperMock
        }
      })
      const instance1 = nodeIrSdk.getInstance()
      const instance2 = nodeIrSdk.getInstance()
      instance1.should.equal(instance2)
    })
  })
})
